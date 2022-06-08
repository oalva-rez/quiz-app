import React, { useState, useEffect } from "react";
import Question from "./Question";
import { nanoid } from "nanoid";

export default function Quiz(props) {
  const [allQuestions, setAllQuestions] = useState([]);
  const [playAgain, setPlayAgain] = useState(false);
  const [checkAnswers, setCheckAnswers] = useState(false);
  console.log(checkAnswers);
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
  }, []);

  const questionElements = allQuestions.map((obj) => (
    <Question obj={obj} key={obj.id} checkAnswers={checkAnswers} />
  ));
  function toggleCheckAnswers() {
    setCheckAnswers((prev) => !prev);
  }
  return (
    <div className="quiz--container">
      <div className="quiz--questions">{questionElements}</div>
      <button className="quiz--button" onClick={toggleCheckAnswers}>
        {!checkAnswers ? "Check Answers" : "Play Again"}
      </button>
    </div>
  );
}
