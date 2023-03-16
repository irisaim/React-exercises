import React, { useEffect, useState, useRef } from "react";
import "./quiz.css";
import Modal from "react-modal";

const questions = [
  {
    title: "What was Meta Platforms Inc formerly known as?",
    variants: ["Facebook", "Google", "Tweeter"],
    correct: 1,
  },
  {
    title: "What is the capital of Turkey",
    variants: ["Istanbul", "Paris", "Ankara"],
    correct: 3,
  },
  {
    title: "What is the capital of France",
    variants: ["Washington", "Paris", "Madrid"],
    correct: 2,
  },
  {
    title: "What is the capital of Germany",
    variants: ["Berlin", "Barcelona", "Bonn"],
    correct: 1,
  },
  {
    title: "What is the capital of Spain",
    variants: ["Mallorca", "Barcelona", "Madrid"],
    correct: 3,
  },
  {
    title: "What is the capital of Italy",
    variants: ["Milan", "Rome", "Madrid"],
    correct: 2,
  },
  {
    title: "What is the capital of Poland",
    variants: ["Warshaw", "Bucharest", "Budapest"],
    correct: 1,
  },
  {
    title: "What is the capital of Russia",
    variants: ["Saint Petersburg", "Moscow", "Kiev"],
    correct: 2,
  },
];

function Result(props) {
  return (
    <div className="result">
      <img src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png" />
      <h2>
        {props.correct} wrong answers in a total of {props.questionsLength} questions
      </h2>
      <button onClick={props.onClickCancel}>Restart</button>
    </div>
  );
}

function Game(props) {
  const percentage = Math.round((props.step / props.questionsLength) * 100);
  return (
    <>
      <div className="progress">
        <div
          style={{ width: `${percentage}%` }}
          className="progress__inner"
        ></div>
      </div>
      <h1>{props.currentQuestion.title}</h1>
      <ul>
        {props.currentQuestion.variants.map((question, idx) => (
          <li key={question} onClick={() => props.onClickVariant(idx)}>
            {question}
          </li>
        ))}{" "}
      </ul>
    </>
  );
}

function Quiz() {
  const [step, setStep] = React.useState(0);
  const currentQuestion = questions[step];
  const [correct, setCorrect] = React.useState(0);
  const questionsLength = questions.length;

  const onClickVariant = (idx) => {
    setStep(step + 1);
    if (idx === currentQuestion.correct) setCorrect(correct + 1);
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "50vh",
      width: "500px",
      borderRadius: "30px",
      padding: "40px",
      backgroundColor: " #6a5be2",
      color: "white",
      opacity: "1",
    },
  };

  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(true);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const onClickCancel = () => {
    setStep(0);
    setCorrect(0);
  };

  return (
    <div className="container">
    <div className="wrapper">
      <div>
        {/* <button className="startModal" onClick={openModal}>Open Modal</button> */}
        <Modal
          // isOpen={openModal}
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
        >
          <form>
            <h2 className="modalTitle" ref={(_subtitle) => (subtitle = _subtitle)}>Welcome to Quiz</h2>
            <button onClick={closeModal} className="startModal">
              Start
            </button>
          </form>
        </Modal>
      </div>
      {step !== questionsLength ? (
        <Game
          questionsLength={questionsLength}
          step={step}
          currentQuestion={currentQuestion}
          onClickVariant={onClickVariant}
        />
      ) : (
        <Result
          correct={correct}
          questionsLength={questionsLength}
          onClickCancel={onClickCancel}
        />
      )}
    </div>
    </div>
  );
}

export default Quiz;
