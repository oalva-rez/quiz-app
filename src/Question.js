import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";

export default function Question(props) {
  const { question, id, correctAnswer, wrongAnswers } = props.obj;
  const [allChoices, setAllChoices] = useState(generateChoices());
  const [first, setFirst] = useState([]);

  // combine correct answer with with wrong answers within an array
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

  function selectChoiceProperty(id) {
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
  useEffect(() => {
    if (props.checkAnswers) {
      for (let ques of allChoices) {
        if (ques.isCorrect && ques.isSelected) {
          props.countCorrect(1);
        }
      }
    }
    return () => {
      props.countCorrect(0, true);
    };
  }, [props.checkAnswers]);

  // render choices
  let choices = allChoices.map((choice) => {
    function getCheckedAnswersStyle() {
      if (choice.isSelected && choice.isCorrect) {
        return { backgroundColor: "#94D7A2", border: "none" };
      } else if (!choice.isSelected && choice.isCorrect) {
        return { backgroundColor: "#F8BCBC", opacity: "0.5", border: "none" };
      } else if (choice.isSelected) {
        return { backgroundColor: "#94D7A2", border: "none" };
      }
    }
    console.log(props.checkAnswers);
    function selectChoiceStyling() {
      if (choice.isSelected) {
        return {
          backgroundColor: "#D6DBF5",
          border: "none",
        };
      }
    }
    return (
      <li
        className="quiz--choice"
        style={
          props.checkAnswers ? getCheckedAnswersStyle() : selectChoiceStyling()
        }
        onClick={() => {
          if (!props.checkAnswers) {
            selectChoiceProperty(choice.id);
          }
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
      <ul className="quiz--all-choices">{choices}</ul>
    </div>
  );
}
