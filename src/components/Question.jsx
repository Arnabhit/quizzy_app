import React from "react";

function Question({ questionData, selectedAnswer, handleAnswer }) {
  return (
    <div className="p-10 bg-slate-500 rounded shadow-md w-96 mt-12">
      <h2 className="mb-4 text-xl font-bold text-white">
        {questionData.question}
      </h2>
      {questionData.answers.map((answer, index) => (
        <button
          key={index}
          onClick={() => handleAnswer(answer)}
          className={`w-full py-2 px-4 mt-2 font-semibold text-left rounded shadow-md text-white ${
            selectedAnswer === answer
              ? answer === questionData.correctAnswer
                ? "bg-green-500"
                : "bg-red-500"
              : "bg-blue-500"
          }`}
          disabled={selectedAnswer !== null}
        >
          {answer}
        </button>
      ))}
    </div>
  );
}

export default Question;
