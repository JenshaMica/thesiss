import React from "react";
import { useNavigate } from "react-router-dom";

const Wellbeing = () => {
    const navigate = useNavigate();

  return (
    <div className="mental-container">
        <div className="mental-description">
      <h2>Well-Being Test</h2>
      <p> This test is designed to help you assess your general well-being, including emotional,
              psychological, and social health. It is not a clinical assessment but can offer insights into
              areas of your life that may need attention or care.
            </p>
      <button onClick={() => navigate("/well-being-test")}>Start Test</button>
    </div>
    </div>
  );
};

export default Wellbeing;
