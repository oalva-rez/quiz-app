import React from "react";

export default function IntroPage(props) {
  return (
    <div className="intro--container">
      <h1>Quizzical</h1>
      <h3>Challenge your intelligence.</h3>
      <button onClick={props.startQuiz}>Start Quiz</button>
    </div>
  );
}
