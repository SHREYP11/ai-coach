import React from 'react';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-center text-white">
      {/* Title */}
      <h1 className="text-5xl font-bold mb-6">Welcome to Your MCAT Prep Coach</h1>
      
      {/* Image */}
      <img
        src="path_to_image" // Add a relevant image path
        alt="MCAT preparation"
        className="w-96 h-72 object-cover rounded-lg shadow-lg mb-6"
      />
      
      {/* Welcome Statement */}
      <p className="text-xl mb-4">Ready to push yourself beyond your limits?</p>
      
      {/* Message: App Purpose */}
      <p className="text-lg mb-8">
        Our AI-powered MCAT coach is here to challenge you with intense practice passages and questions from all four MCAT sections.
        Get real-time feedback and motivational support as you prepare for your exam.
      </p>

      {/* Section Overview */}
      <div className="grid grid-cols-2 gap-4 mb-8">
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

      {/* Call to Action */}
      <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg">
        Start Practicing Now
      </button>
    </div>
  );
};

export default Home;
