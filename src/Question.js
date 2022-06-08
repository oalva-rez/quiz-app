import React, { useState } from "react";
import { nanoid } from "nanoid";

export default function Question(props) {
  const { question, id, correctAnswer, wrongAnswers } = props.obj;
  const [allChoices, setAllChoices] = useState(generateChoices());

  function generateChoices() {
    let answersObj = wrongAnswers.map((wrongAnswer) => {
      return {
        choice: wrongAnswer,
        isCorrect: false,
        isSelected: false,
        id: nanoid(),
      };
    });
    const rndNum = Math.floor(Math.random() * wrongAnswers.length + 1);
    answersObj.splice(rndNum, 0, {
      choice: correctAnswer,
      isCorrect: true,
      isSelected: false,
      id: nanoid(),
    });
    return answersObj;
  }
  function selectChoice(id) {
    setAllChoices((prev) => {
      //unselect all before selecting user choice to avoid double selection
      const newArray = prev.map((obj) => {
        return { ...obj, isSelected: false };
      });
      return newArray.map((x) => {
        return x.id === id ? { ...x, isSelected: !x.isSelected } : { ...x };
      });
    });
  }

  let choices = allChoices.map((choice) => {
    return (
      <li
        className="choice"
        onClick={() => {
          selectChoice(choice.id);
        }}
        key={choice.id}
      >
        {choice.choice}
      </li>
    );
  });

  return (
    <div className="quiz--question">
      <h2>{question}</h2>
      <ul className="choices">{choices}</ul>
    </div>
  );
}
