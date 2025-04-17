import React from "react";
import { useNavigate } from "react-router-dom";

const Depression = () => {
    const navigate = useNavigate();

  return (
    <div className="mental-container">
      <div className="mental-description">  
      <h2>Depression Test</h2>
      <p> This test is designed to help you reflect on symptoms of depression you may be experiencing.
              It is not a diagnostic tool, but it can help raise awareness and encourage you to seek support if needed.
            </p>
      <button onClick={() => navigate("/depression-test")}>Start Test</button>
    </div>
    </div>
  );
};

export default Depression;
