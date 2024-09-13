"use client";

import { ChallengePreferences } from '@prisma/client';
import React, { useState } from 'react'
import { Button } from './ui/button';
import { Switch } from "@/components/ui/switch"
import DifficultyCard from './DifficultyCard';
import axios from 'axios';
import toast from 'react-hot-toast';



const difficulties = [
  {
    id: "EASY",

    level: "Easy",

    description:
      "This difficulty level is for people who are just starting out with MCAT prep. Receive 1 passage per day (sent at 12PM EST). The passage can be from any of the four MCAT sections: Biological and Biochemical Foundations of Living Systems (BBLS), Chemical and Physical Foundations of Biological Systems (CPBS), Psychological, Social, and Biological Foundations of Behavior (PSBB), or Critical Analysis and Reasoning Skills (CARS). Each passage is followed by 5 questions focused on fundamental concepts.",
  },
  {
    id: "MEDIUM",

    level: "Medium",

    description:
      "This difficulty level is for people with a moderate understanding of MCAT subjects. Receive 2 passages per day (9AM and 12PM EST). Each passage can be from any of the four MCAT sections (BBLS, CPBS, PSBB, or CARS) and will include 5 questions per passage. The questions will require analysis and some application of concepts.",
  },
  {
    id: "HARD",

    level: "Hard",

    description:
      "This difficulty level is for people who are ready for a serious challenge. Receive 4 passages per day (6AM, 9AM, 12PM, and 5PM EST). Each passage will focus on one of the four MCAT sections: Biological and Biochemical Foundations of Living Systems (BBLS), Chemical and Physical Foundations of Biological Systems (CPBS), Psychological, Social, and Biological Foundations of Behavior (PSBB), and Critical Analysis and Reasoning Skills (CARS). Each passage will include 5 questions that push you with advanced concepts and critical thinking.",
  },
];

  
  type Difficulties = "EASY" | "MEDIUM" | "HARD";


  
interface ProfileContainerProps {
    challengePreferences: ChallengePreferences;
  }

function ProfileContainer({challengePreferences}: ProfileContainerProps) {
    const [saving, setSaving] = useState(false);

    
    
    const [selectedDifficulty, setSelectedDifficulty] = useState(
        challengePreferences.challengeId
      );
    
    
    
    const [sendNotifications, setSendNotifications] = useState(
        challengePreferences.sendNotifications);

    const handleToggleNotifications = () => {  setSendNotifications((prev) => !prev);}

    const handleSelectDifficulty = (difficultyId: Difficulties) => {
        setSelectedDifficulty(difficultyId);
      };
    


      const handleSave = async () => {
        setSaving(true);
        try {
          const response = await axios.post<{
            success: boolean;
            data?: ChallengePreferences;
            message?: string;
          }>("/api/challenge-preferences", {
            id: challengePreferences.id,
            challengeId: selectedDifficulty,
            sendNotifications,
          });
    
          if (!response.data.success || !response.data.data) {
            console.error(response.data.message ?? "Something went wrong");
            toast.error(response.data.message ?? "Something went wrong");
            return;
          }
    
          toast.success("Preferences saved!");
        } catch (error) {
          console.error(error);
          toast.error("Something went wrong. Please try again.");
        } finally {
          setSaving(false);
        }
      };


      

  return (
    <div className="flex flex-col">

      <div className="flex flex-row justify-between items-center mb-4">
        <h1 className="font-bold text-2xl">Level Difficulty</h1>
        <Button onClick={handleSave}>{saving ? "Saving..." : "Save"}</Button>
      </div>
     
      <div className="flex flex-row items-center justify-between mb-4 p-4 shadow rounded-lg">
        <div>
          <h3 className="font-medium text-lg  text-gray-900">
            Push Notifications
          </h3>
          <p>Receive notifications when new passages and questions are available.</p>
        </div>
        <Switch
          checked={sendNotifications}
          onCheckedChange={handleToggleNotifications}
        />
      </div>


      <div className="grid grid-col-1 md:grid-cols-3 gap-4">
        {difficulties.map((difficulty) => (
          <DifficultyCard
            key={difficulty.id}
            level={difficulty.level}
            description={difficulty.description}
            selected={difficulty.id === selectedDifficulty}
            onSelect={() =>
              handleSelectDifficulty(difficulty.id as Difficulties)
            }
          />
        ))}
      </div>
    </div>
  )
}

export default ProfileContainer