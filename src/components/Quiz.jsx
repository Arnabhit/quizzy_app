import React, { useState, useEffect } from "react";
import Question from "./Question";
import Result from "./Result";

const quizData = [
  {
    question: "Which of the following is not a JavaScript data type?",
    answers: ["String", "Number", "Boolean", "Character"],
    correctAnswer: "Character",
  },
  {
    question:
      "Which of the following hooks is used to manage state in a functional component?",
    answers: ["useEffect", "useContext", "useState", "useReducer"],
    correctAnswer: "useState",
  },
  {
    question: "In React, what is the purpose of useEffect hook?",
    answers: [
      "To manage state in a functional component.",
      "To perform side effects in a functional component",
      "To create context for sharing state across components",
      "To define routes in a React application.",
    ],
    correctAnswer: "To perform side effects in a functional component",
  },
  {
    question:
      "What is the default scope of variables declared with var in Node.js?",
    answers: ["Block scope", "Global scope", "Function scope", "Module scope"],
    correctAnswer: "Function scope",
  },
  {
    question: "Which of the following is not a JavaScript data type?",
    answers: ["String", "Number", "Boolean", "Character"],
    correctAnswer: "Character",
  },
  {
    question:
      "Which of the following hooks is used to manage state in a functional component?",
    answers: ["useEffect", "useContext", "useState", "useReducer"],
    correctAnswer: "useState",
  },
];

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [timer, setTimer] = useState(10);
  const [quizStarted, setQuizStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  useEffect(() => {
    if (timer > 0 && quizStarted && !quizFinished && !isPaused) {
      const timerId = setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    } else if (timer === 0) {
      handleNextQuestion();
    }
  }, [timer, quizStarted, quizFinished, isPaused]);

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);

    setUserAnswers([...userAnswers, answer]);

    if (quizData[currentQuestion].correctAnswer === answer) {
      setScore(score + 10);
    }

    setTimeout(() => {
      handleNextQuestion();
    }, 1000);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setTimer(10);
    } else {
      setQuizFinished(true);
    }
  };

  const handleTryAgain = () => {
    setQuizStarted(true);
    setQuizFinished(false);
    setCurrentQuestion(0);
    setScore(0);
    setUserAnswers([]);
    setSelectedAnswer(null);
    setTimer(30);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-700">
      {quizStarted && !quizFinished && (
        <div className="fixed top-0 left-0 right-0 bg-gray-800 text-white text-center py-2">
          <div>Time remaining: {timer} seconds</div>
        </div>
      )}
      {quizStarted && !quizFinished && (
        <div className="mt-12">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="py-2 px-4 font-semibold text-center bg-blue-500 rounded shadow-md text-white"
          >
            {isPaused ? "Resume" : "Pause"}
          </button>
        </div>
      )}
      {!quizStarted ? (
        <div className="p-10 bg-slate-500 rounded shadow-md w-96">
          <h2 className="mb-4 px-20 text-xl font-bold text-white">
            Start Tech Quiz
          </h2>
          <button
            onClick={() => setQuizStarted(true)}
            className="w-full py-2 mt-2  font-semibold text-center bg-blue-500 rounded shadow-md text-white"
          >
            Start Now
          </button>
        </div>
      ) : !quizFinished ? (
        <Question
          questionData={quizData[currentQuestion]}
          selectedAnswer={selectedAnswer}
          handleAnswer={handleAnswer}
        />
      ) : (
        <Result
          score={score}
          totalQuestions={quizData.length}
          handleTryAgain={handleTryAgain}
        />
      )}
    </div>
  );
}

export default Quiz;
