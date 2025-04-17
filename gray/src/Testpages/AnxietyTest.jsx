import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../testDesign/EatingTest.css";

const questions = [
  {
    id: 1,
    text: "Feeling nervous, anxious, or on edge?",
    options: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
  },
  {
    id: 2,
    text: "Not being able to stop or control worrying?",
    options: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
  },
  {
    id: 3,
    text: "Worrying too much about different things?",
    options: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
  },
  {
    id: 4,
    text: "Trouble relaxing?",
    options: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
  },
  {
    id: 5,
    text: "Being so restless that it is hard to sit still?",
    options: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
  },
  {
    id: 6,
    text: "Becoming easily annoyed or irritable?",
    options: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
  },
  {
    id: 7,
    text: "Feeling afraid as if something awful might happen?",
    options: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
  },
];

const optionValues = {
  "Not at all": 0,
  "Several days": 1,
  "More than half the days": 2,
  "Nearly every day": 3,
};

const logisticRegression = (score) => {
  if (score >= 15) {
    return {
      result: "Severe Anxiety Consider professional help. Your score indicates a high level of anxiety that may significantly impact your daily activities. Seeking help from a mental health professional can provide support and effective strategies to manage your symptoms. You're not alone—taking the first step toward help is a sign of strength."
    };
  } else if (score >= 10) {
    return {
      result: "Moderate Anxiety – Keep monitoring. Your symptoms may be manageable now, but it's important to keep track of your mental health. Consider stress-reducing activities and talk to someone you trust. If symptoms worsen, don't hesitate to seek professional support."
    };
  } else if (score >= 5) {
    return {
      result: "Mild Anxiety – Be mindful of your well-being. Some anxiety is normal, but it's good to be aware of your triggers and take care of your mental health through relaxation techniques, mindfulness, or talking to a friend."
    };
  } else {
    return {
      result: "Minimal Anxiety – Keep taking care of yourself! You’re showing little to no signs of anxiety. Keep up your healthy habits and self-care routines to maintain your well-being."
    };
  }
};


const AnxietyTest = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(null);

  const handleOptionSelect = (questionIndex, selectedOption) => {
    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: selectedOption,
    }));
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length < questions.length) {
      alert("Please answer all the questions before submitting.");
      return;
    }

    const totalScore = Object.values(answers)
      .map((ans) => optionValues[ans])
      .reduce((sum, value) => sum + value, 0);

    const anxietyResult = logisticRegression(totalScore);

    setResult(anxietyResult);
    setShowResult(true);
  };

  return (
    <div className="test-container">
      <h1>Anxiety Test (GAD-7)</h1>

      {!showResult ? (
        <div className="question-section">
          {questions.map((question, index) => (
            <div key={question.id} className="question-item">
              <p>{index + 1}. {question.text}</p>
              <div className="button-options">
                {question.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleOptionSelect(index, option)}
                    className={`option-button ${
                      answers[index] === option ? "selected" : ""
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <button onClick={handleSubmit} className="submit-button">
            SUBMIT
          </button>
        </div>
      ) : (
        <div className="result-section">
          <h2>Your Result:</h2>
          <p>{result.result}</p>
        </div>
      )}
    </div>
  );
};

export default AnxietyTest;
