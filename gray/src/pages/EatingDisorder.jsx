import React from "react";
import { useNavigate } from "react-router-dom";

const EatingDisorder = () => {
    const navigate = useNavigate();
  return (
    <div className="mental-container">
        <div className="mental-description">
      <h2>Eating Disorder Test</h2>
      <p>This test is intended to help you reflect on your eating habits, body image, and emotional relationship with food.
              It is not a medical diagnosis but may indicate if further support from a mental health professional is needed.
            </p>
      <button onClick={() => navigate("/eating-disorder-test")}>Start Test</button>
    </div>
    </div>
  );
};

export default EatingDisorder;
