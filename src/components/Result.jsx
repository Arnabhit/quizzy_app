import React from "react";

function Result({ score, totalQuestions, handleTryAgain }) {
  return (
    <div
      className={`p-10 rounded shadow-md w-96 mt-12 ${
        (10 * totalQuestions) / 2 < score ? "bg-green-500" : "bg-red-500"
      }`}
    >
      <h2 className="mb-4 text-xl font-bold text-white">
        {(100/10 * totalQuestions) / 2 < score
          ? `Well done! You have scored ${score}`
          : `Oops! Your score is ${score}`}
      </h2>
      <button
        onClick={handleTryAgain}
        className="w-full py-2 mt-2 font-semibold text-center bg-blue-500 rounded shadow-md text-white"
      >
        Try Again
      </button>
    </div>
  );
}

export default Result;
