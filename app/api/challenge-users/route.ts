import { prismadb } from "@/lib/prismadb";
import { UserMeta, UserThread } from "@prisma/client";
import axios from "axios";
import { NextResponse } from "next/server";
import OpenAI from "openai";

interface UserThreadMap {
  [userId: string]: UserThread;
}

interface UserMetaMap {
  [userId: string]: UserMeta;
}



export async function POST(request: Request) {
  // Validation
  const body = await request.json();

  const { challengeId, secret } = body;

  if (!challengeId || !secret) {
    return NextResponse.json(
      { success: false, message: "Missing required fields" },
      {
        status: 400,
      }
    );
  }

  if (secret !== process.env.APP_SECRET_KEY) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      {
        status: 401,
      }
    );
  }

  // Define work out message prompt
  const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
    {
      role: "system",
      content: `
        Generate an ultra-intense, MCAT-style passage and 5 questions with respect to that passage. The passage should reflect a difficult and complex topic from the MCAT curriculum and can be from any of the mcat topic categories, such as CARS, biochemistry or psychology. After the passage, provide 5 challenging multiple-choice questions related to the passage. Then, offer motivational feedback based on whether the user's answer is correct or incorrect. The feedback should be intense, challenging the user to push their limits, and reflect a "never satisfied" mentality, while offering guidance on improvement.
  
        Example format:
  
        Passage:
        Cells rely on ion channels to maintain homeostasis, allowing the transport of charged particles across membranes. These channels are crucial for nerve signal transmission. In patients with cystic fibrosis, a genetic mutation affects the CFTR channel, impairing chloride ion transport. This disrupts the balance of fluids in the lungs and pancreas, leading to the accumulation of thick mucus...
  
        Question:
        Which of the following is the primary function of the CFTR protein in the lungs?
        - A) Transport of glucose across cell membranes
        - B) Regulation of sodium ion concentration
        - C) Chloride ion transport across epithelial cells
        - D) Uptake of oxygen into the bloodstream
  
        Motivational feedback (correct):
        "Correct! But don’t get too comfortable. This is just one step on the path to crushing the MCAT. Push harder, study more, and dominate every topic until there's no room for error. You’ve got more in you!"
  
        Motivational feedback (incorrect):
        "Wrong answer. But good—that’s where the growth happens. Review the passage, understand the mechanics, and come back stronger. The only way forward is through. Keep grinding, no time for excuses!"`,
    },
    {
      role: "user",
      content: `Generate an MCAT passage with question and motivational feedback. Remember, follow the format specified above. Nothing else.`,
    },
  ];
  
  
  

  //  Use OpenAI to generate work out
  const {
    data: { message, success },
  } = await axios.post<{ message?: string; success: boolean }>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/openai`,
    {
      messages,
      secret: process.env.APP_SECRET_KEY,
    }
  );

  if (!message || !success) {
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong with generate openai response",
      },
      {
        status: 500,
      }
    );
  }

  console.log(message);

  // Grab all challenge preferences
  const challengePreferences = await prismadb.challengePreferences.findMany({
    where: {
      challengeId,
    },
  });

  console.log("challengePreferences", challengePreferences);

  const userIds = challengePreferences.map((cp) => cp.userId);

  console.log("userIds", userIds);

  //  Grab all user threads
  const userThreads = await prismadb.userThread.findMany({
    where: {
      userId: {
        in: userIds,
      },
    },
  });

  console.log("userThreads", userThreads);

   // Grab all user metadata
   const userMetas = await prismadb.userMeta.findMany({
    where: {
      userId: {
        in: userIds,
      },
    },
  });

  console.log("userMetas", userMetas);

  

  const userThreadMap: UserThreadMap = userThreads.reduce((map, thread) => {
    map[thread.userId] = thread;
    return map;
  }, {} as UserThreadMap);

  const userMetaMap = userMetas.reduce((map, meta) => {
    map[meta.userId] = meta;
    return map;
  }, {} as UserMetaMap);


  

  // Add messages to threads


  const threadAndNotificationsPromises: Promise<any>[] = [];


  try {

    challengePreferences.forEach((cp) => {
        //  FIND THE RESPECTIVE USER
        const userThread = userThreadMap[cp.userId];
  
        //  ADD MESSAGE TO THREAD
        if (userThread) {
          // Send Message
          threadAndNotificationsPromises.push(
            axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/message/create`, {
              message,
              threadId: userThread.threadId,
              fromUser: "false",
            })
          );
  
          // Send Notification

          if (cp.sendNotifications) {
            const correspondingUserMeta = userMetaMap[cp.userId];
            threadAndNotificationsPromises.push(
              axios.post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/send-notifications`,
                {
                  subscription: {
                    endpoint: correspondingUserMeta.endpoint,
                    keys: {
                      auth: correspondingUserMeta.auth,
                      p256dh: correspondingUserMeta.p256dh,
                    },
                  },
                  message,
                }
              )
            );

          }
          
          
        }
      });
  
      await Promise.all(threadAndNotificationsPromises);
  
      return NextResponse.json({message}, {status: 200});
  

  } catch (error){

    console.error(error);
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      {
        status: 500,
      }
    );


  }


    
    
}