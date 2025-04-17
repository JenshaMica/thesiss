import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../testDesign/EatingTest.css";

// BFI-10 Questions
const questions = [
  { id: 1, text: "I see myself as someone who is talkative.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] },
  { id: 2, text: "I see myself as someone who is reserved.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] },
  { id: 3, text: "I see myself as someone who is outgoing, sociable.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] },
  { id: 4, text: "I see myself as someone who tends to find fault with others.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] },
  { id: 5, text: "I see myself as someone who is helpful and unselfish with others.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] },
  { id: 6, text: "I see myself as someone who is relaxed, handles stress well.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] },
  { id: 7, text: "I see myself as someone who gets nervous easily.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] },
  { id: 8, text: "I see myself as someone who has frequent mood swings.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] },
  { id: 9, text: "I see myself as someone who is curious about many different things.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] },
  { id: 10, text: "I see myself as someone who is full of energy.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] },
];

const optionValues = {
  "Strongly Disagree": 1,
  "Disagree": 2,
  "Neutral": 3,
  "Agree": 4,
  "Strongly Agree": 5,
};

const calculatePersonality = (scores) => {
  const personality = {
    Extraversion: scores[0] + scores[2] + scores[9],
    Agreeableness: scores[4] + (6 - scores[3]), // Reverse-coded
    Neuroticism: scores[6] + scores[7],
    Openness: scores[8],
    Conscientiousness: scores[5] + (6 - scores[1]), // Reverse-coded
  };

  return {
    Extraversion: {
      score: personality.Extraversion,
      description: `Extraversion – This trait reflects how outgoing and energetic you are. A higher score suggests you enjoy social interactions, are enthusiastic, and tend to seek excitement. If your score is lower, you may be more reserved and prefer solitude or small gatherings.`
    },
    Agreeableness: {
      score: personality.Agreeableness,
      description: `Agreeableness – This trait measures how cooperative, kind, and empathetic you are toward others. A higher score indicates you are compassionate, cooperative, and willing to help others. A lower score might suggest that you tend to be more critical or less trusting of others.`
    },
    Neuroticism: {
      score: personality.Neuroticism,
      description: `Neuroticism – This trait refers to how prone you are to experiencing negative emotions like anxiety, sadness, or anger. A higher score suggests that you may be more sensitive to stress and emotions. A lower score indicates you are generally calm, composed, and less affected by stress.`
    },
    Openness: {
      score: personality.Openness,
      description: `Openness – This trait reflects your willingness to try new things and engage with creative or abstract ideas. A high score indicates curiosity, open-mindedness, and a preference for novelty and variety. A lower score suggests a more conventional approach and preference for routine and familiar experiences.`
    },
    Conscientiousness: {
      score: personality.Conscientiousness,
      description: `Conscientiousness – This trait measures how organized, responsible, and reliable you are. A higher score suggests you are disciplined, detail-oriented, and able to manage tasks effectively. A lower score may suggest a more relaxed or spontaneous approach to life with less focus on organization and planning.`
    }
  };
};

const EatingTest = () => {
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
      alert("Please answer all questions before submitting.");
      return;
    }

    const scoreArray = Object.values(answers).map((ans) => optionValues[ans]);
    const personalityTraits = calculatePersonality(scoreArray);

    setResult(personalityTraits);
    setShowResult(true);
  };

  return (
    <div className="test-container">
      {!showResult ? (
        <div className="question-section">
          <h1>Personality Test (BFI-10)</h1>
          {questions.map((question, index) => (
            <div key={question.id} className="question-item">
              <p>{index + 1}. {question.text}</p>
              <div className="button-options">
                {question.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleOptionSelect(index, option)}
                    className={`option-button ${answers[index] === option ? "selected" : ""}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <button onClick={handleSubmit} className="submit-button">SUBMIT</button>
        </div>
      ) : (
        <div className="result-section">
          <h2>Your Personality Trait Scores:</h2>
          <ul>
            {Object.entries(result).map(([trait, { score, description }]) => (
              <li key={trait}>
                <strong>{trait}:</strong> {score} <br />
                <em>{description}</em>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default EatingTest;
