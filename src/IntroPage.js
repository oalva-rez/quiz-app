import React from "react";

export default function IntroPage(props) {
  return (
    <div className="intro--container">
      <h1 className="intro--title">Quizzical</h1>
      <h3 className="intro--desc">Challenge your intelligence.</h3>
      <button onClick={props.startQuiz} className="intro--button">
        Start Quiz
      </button>
    </div>
  );
}
