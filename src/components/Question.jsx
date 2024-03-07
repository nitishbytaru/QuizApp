import React, { useState, useEffect } from "react";
import data from "./data";
import Options from "./Options";

function Question() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [options, setOptions] = useState({});
  const [currentScore, setCurrentScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    //these are the main code to be executed
    const fetchData = async () => {
      try {
        const data = await fetch("https://the-trivia-api.com/v2/questions");
        const response = await data.json();
        setQuestions(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    // const fetchData = () => {
    //   try {
    //     const response = data;
    //     setQuestions(response);
    //   } catch (error) {
    //     console.error("Error fetching data:", error);
    //   }
    // };

    fetchData();
  }, []);

  const shuffelOptions = (questions, currentQuestionIndex) => {
    let options = [];
    let correctAnswer;
    if (questions.length > 0) {
      // creating a new array that holds all the options
      correctAnswer = questions[currentQuestionIndex].correctAnswer;
      options.push(questions[currentQuestionIndex].correctAnswer);
      questions[currentQuestionIndex].incorrectAnswers.map((res) => {
        options.push(res);
      });

      // Fisher-Yates shuffle algorithm
      //using this algorithm to shuffle the options
      for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
      }
    }
    return {
      optionsList: options,
      correctAnswer: correctAnswer,
    };
  };

  useEffect(() => {
    if (questions.length > 0) {
      setOptions(shuffelOptions(questions, currentQuestionIndex));
    }
  }, [questions, currentQuestionIndex]);

  //function to handle the next button
  const handleNextQuestion = () => {
    if (currentQuestionIndex === questions.length - 1) {
      setGameOver(true);
    }
    if (selectedAnswer) {
      if (selectedAnswer === options.correctAnswer) {
        setCurrentScore((prevScore) => prevScore + 1);
      }
      setCurrentQuestionIndex((prevIndex) =>
        prevIndex < questions.length - 1 ? prevIndex + 1 : prevIndex
      );
      setSelectedAnswer(null);
    } else {
      console.log("please select the answer");
    }
  };

  return (
    <>
      {!gameOver ? (
        <div className="w-full h-full bg-black flex flex-col justify-center px-72">
          <div className="text-white text-2xl">Score:{currentScore}</div>
          {questions.length > 0 && Object.keys(options).length > 0 ? (
            <div className="m-4 p-4 bg-blue-600 rounded-lg">
              <div>
                <p className="text-2xl my-4 py-2 border text-white bg-blue-800 rounded-xl">
                  {questions[currentQuestionIndex].question.text}
                </p>
                <Options
                  options={options.optionsList}
                  selectedAnswer={selectedAnswer}
                  setSelectedAnswer={setSelectedAnswer}
                />
              </div>
              <div className="flex justify-around text-xl">
                <button
                  className="bg-green-600 text-white py-2 px-12 mt-4 rounded-2xl border border-black"
                  onClick={handleNextQuestion}
                >
                  Next
                </button>
              </div>
            </div>
          ) : (
            <p className="flex items-center h-full justify-center text-xl text-white">
              Loading questions...
            </p>
          )}
        </div>
      ) : (
        <div className="w-full h-full bg-black flex flex-col justify-center px-72">
          <div className="m-4 p-4 bg-blue-600 rounded-lg">
            <p className="text-3xl">Your Score:{currentScore}</p>
            <p className="text-3xl">GameOver</p>
          </div>
        </div>
      )}
    </>
  );
}

export default Question;
