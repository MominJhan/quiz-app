import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ViewDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData')) || [];
    const lastUser = storedData[storedData.length - 1];

    if (lastUser && lastUser.result) {
      setResult(lastUser.result);
    } else {
      console.error('No result found for the last user');
    }
  }, []);

  if (!result) {
    return <div>No result available. Please try again.</div>;
  }

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="view-detail-container">
      <h2>Quiz Result Details</h2>
      <p>Total Score: {result.score}</p>
      <p>Total Questions: {result.questions.length}</p>
      
      <div className="questions-list">
        {result.questions.map((question, index) => (
          <div key={index} className="question-item">
            <h3>Question {index + 1}:</h3>
            <p dangerouslySetInnerHTML={{ __html: question.question }}></p>
            <div>
              <strong>Correct Answer:</strong>
              <p dangerouslySetInnerHTML={{ __html: question.correct_answer }}></p>
            </div>
            <div>
              <strong>Choices:</strong>
              {question.incorrect_answers.concat(question.correct_answer).map((choice, i) => (
                <p key={i} dangerouslySetInnerHTML={{ __html: choice }}></p>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <button onClick={handleBackToHome}>Back to Home</button>
    </div>
  );
}

export default ViewDetail;
