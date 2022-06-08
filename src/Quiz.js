import React, { useState, useEffect } from "react";
import Question from "./Question";
import { nanoid } from "nanoid";

export default function Quiz(props) {
  const [allQuestions, setAllQuestions] = useState([]);
  const [checkAnswers, setCheckAnswers] = useState(false);
  const [playAgain, setPlayAgain] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  useEffect(() => {
    fetch(
      "https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple",
      {
        mode: "cors",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setAllQuestions(() => {
          let newArray = [];
          for (let obj of data.results) {
            newArray.push({
              question: obj.question,
              correctAnswer: obj.correct_answer,
              wrongAnswers: obj.incorrect_answers,
              id: nanoid(),
            });
          }
          return newArray;
        });
      });
  }, [playAgain]);
  function countCorrect(num, reset = false) {
    setCorrectAnswers((prev) => prev + num);
    if (reset) {
      setCorrectAnswers(0);
    }
  }

  function toggleCheckAnswers() {
    setCheckAnswers((prev) => !prev);
  }
  function togglePlayAgin() {
    setPlayAgain((prev) => !prev);
    setCheckAnswers((prev) => !prev);
  }

  const questionElements = allQuestions.map((obj) => (
    <Question
      obj={obj}
      key={obj.id}
      checkAnswers={checkAnswers}
      countCorrect={countCorrect}
    />
  ));

  return (
    <div className="quiz--container">
      <div className="quiz--questions">{questionElements}</div>
      {checkAnswers && <h2>You scored {correctAnswers}/5 correct answers</h2>}
      {!checkAnswers && (
        <button className="quiz--button" onClick={toggleCheckAnswers}>
          Check Answers
        </button>
      )}
      {checkAnswers && (
        <button className="quiz--button" onClick={togglePlayAgin}>
          Play Again
        </button>
      )}
    </div>
  );
}
