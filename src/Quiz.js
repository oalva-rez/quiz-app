import React, { useState, useEffect } from "react";
import Question from "./Question";
import { nanoid } from "nanoid";

export default function Quiz() {
  const [allQuestions, setAllQuestions] = useState([]);
  const [checkAnswers, setCheckAnswers] = useState(false);
  const [playAgain, setPlayAgain] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  function decodeEntity(inputStr) {
    let textarea = document.createElement("textarea");
    textarea.innerHTML = inputStr;
    return textarea.value;
  }

  useEffect(() => {
    fetch(
      "https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple",
      {
        mode: "cors",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        // set array of all question objects on refresh and on play again
        setAllQuestions(() => {
          let newArray = [];

          for (let obj of data.results) {
            let ques, corr;
            let incorr = [];
            // decode html entities from API
            ques = decodeEntity(obj.question);
            corr = decodeEntity(obj.correct_answer);
            obj.incorrect_answers.forEach((x) => {
              incorr.push(decodeEntity(x));
            });
            newArray.push({
              question: ques,
              correctAnswer: corr,
              wrongAnswers: incorr,
              id: nanoid(),
            });
          }
          return newArray;
        });
      });
  }, [playAgain]);

  // set number of correct or reset if play again
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
      <div className="quiz--all-questions">{questionElements}</div>
      {checkAnswers && (
        <h2 className="quiz--result">
          You scored {correctAnswers}/5 correct answers
        </h2>
      )}
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
