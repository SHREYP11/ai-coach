import React from 'react';
import Link from 'next/link';
import coach from '../../components/coach.png'

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-auto min-h-screen bg-black text-center text-white p-4">
      {/* Title */}
      <h1 className="text-3xl md:text-5xl font-bold mb-6">Ready to push yourself beyond your limits?</h1>
      
      {/* Image */}
      <img src={coach.src}  alt="coach logo"  className="w-64 md:w-96 h-48 md:h-72 object-cover rounded-lg shadow-lg mb-6"
      />
      
      {/* Welcome Statement */}
      <p className="text-lg md:text-xl mb-4">This AI-powered MCAT coach is here to push you beyond your limits.</p>
      
      {/* Message: App Purpose */}
      <p className="text-md md:text-lg mb-8 px-4 md:px-8">
        You’ll get real-time feedback, designed to sharpen your skills and keep you focused on your goal. Plus, you’ll receive daily passages tailored to three difficulty levels, ensuring you stay sharp and ready to conquer the exam. Keep grinding, stay relentless, and success will be yours!
      </p>

      {/* Section Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 w-full max-w-4xl px-4">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-2xl font-bold mb-2">Section 1: BBLS</h2>
          <p className="text-md">Biological and Biochemical Foundations of Living Systems.</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-2xl font-bold mb-2">Section 2: CPBS</h2>
          <p className="text-md">Chemical and Physical Foundations of Biological Systems.</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-2xl font-bold mb-2">Section 3: PSBB</h2>
          <p className="text-md">Psychological, Social, and Biological Foundations of Behavior.</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-2xl font-bold mb-2">Section 4: CARS</h2>
          <p className="text-md">Critical Analysis and Reasoning Skills.</p>
        </div>
      </div>

     {/* Call to Action with Link to Chat Page */}
     <Link href="/chat">
        <button className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded-lg mb-8">
          Start Practicing Now
        </button>
      </Link>
    </div>
  );
};

export default Home;
