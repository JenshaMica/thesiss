import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../testDesign/EatingTest.css";

const questions = [
  { id: 1, text: "Little interest or pleasure in doing things?", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
  { id: 2, text: "Feeling down, depressed, or hopeless?", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
  { id: 3, text: "Trouble falling or staying asleep, or sleeping too much?", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
  { id: 4, text: "Feeling tired or having little energy?", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
  { id: 5, text: "Poor appetite or overeating?", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
  { id: 6, text: "Feeling bad about yourself—or that you are a failure or have let yourself or your family down?", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
  { id: 7, text: "Trouble concentrating on things, such as reading the newspaper or watching television?", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
  { id: 8, text: "Moving or speaking so slowly that other people could have noticed? Or the opposite—being so fidgety or restless that you have been moving around a lot more than usual?", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
  { id: 9, text: "Thoughts that you would be better off dead, or of hurting yourself in some way?", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
];

const optionValues = {
  "Not at all": 0,
  "Several days": 1,
  "More than half the days": 2,
  "Nearly every day": 3,
};

const logisticRegression = (score) => {
  if (score >= 20) {
    return {
      result: "Severe Depression – Please seek professional help. Your score suggests a high level of depression that may affect your daily life and well-being. It's important to reach out to a mental health professional who can help you develop effective coping strategies and provide the necessary support. Remember, seeking help is a brave and crucial step toward recovery."
    };
  } else if (score >= 15) {
    return {
      result: "Moderate Depression – Keep monitoring and consider reaching out for support. While your symptoms may not be severe, they could still impact your mental health. Stay mindful of your feelings and consider seeking guidance from a mental health professional if you find your symptoms intensifying. Self-care and talking to trusted individuals can also help manage moderate depression."
    };
  } else if (score >= 10) {
    return {
      result: "Mild Depression – Be mindful of your well-being. At this level, your symptoms may not be overwhelming but still require attention. It's important to practice self-care, reach out to supportive friends or family, and recognize when additional support might be beneficial. Regularly check in with yourself to maintain a healthy mental state."
    };
  } else {
    return {
      result: "Minimal Depression – Keep taking care of yourself! You're showing few signs of depression, but it's always important to focus on maintaining your mental health. Stay active, connected with loved ones, and continue engaging in activities that bring you joy. Keeping a positive routine helps sustain good mental health."
    };
  }
};


const DepressionTest = () => {
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(null);

  const handleOptionSelect = (questionIndex, selectedOption) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: selectedOption,
    }));
  };

  const handleSubmit = () => {
    // Ensure all questions are answered
    if (Object.keys(answers).length < questions.length) {
      alert("Please answer all questions before submitting.");
      return;
    }

    const totalScore = Object.values(answers)
      .map((answer) => optionValues[answer])
      .reduce((acc, val) => acc + val, 0);

    const result = logisticRegression(totalScore);
    setResult(result);
    setShowResult(true);
  };

  return (
    <div className="test-container">
      {!showResult ? (
        <div className="question-section">
          <h1>Depression Test (PHQ-9)</h1>
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

export default DepressionTest;
