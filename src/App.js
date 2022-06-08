import React, { useState } from "react";
import IntroPage from "./IntroPage";
import Quiz from "./Quiz";

function App() {
  const [quizStarted, setQuizStarted] = useState(true);
  function startQuiz() {
    setQuizStarted((prev) => !prev);
  }

  return <>{quizStarted ? <Quiz /> : <IntroPage startQuiz={startQuiz} />}</>;
}

export default App;
