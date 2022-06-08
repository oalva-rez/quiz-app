import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";

export default function Quiz(props) {
  const [allQuestions, setAllQuestions] = useState([]);
  const [playAgain, setPlayAgain] = useState(false);

  useEffect(() => {
    console.log("FETCHING");
    // fetch(api)
    //   .then((res) => res.json())
    //   .then((data) =>
    //     setAllQuestions(() => {
    //       let newArray = [];

    // for each object
    //     pull [question, correctAnswer, wrongAnswers]
    //     newArray.push({
    //             question: question,
    //             correct: correctAnswer,
    //             wrong: wrongAnswers,
    //             nanoId: nanoId()})
    // })
    //   );
  }, []);

  return (
    <div className="quiz--container">
      <div className="quiz--questions"></div>
      <button className="quiz--button">
        {!playAgain ? "Check Answers" : "Play Again"}
      </button>
    </div>
  );
}
