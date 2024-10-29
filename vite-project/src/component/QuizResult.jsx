import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetQuiz } from '../features/quizSlice';

function QuizResult() {
  const { score, questions } = useSelector((state) => state.quiz); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isResultSaved, setIsResultSaved] = useState(false); 

  useEffect(() => {
    SavedInLocalstorage();
  }, [score, questions]);

  const handleRestart = () => {
    dispatch(resetQuiz());
    navigate('/'); 
  };

  const SavedInLocalstorage = () => {
    const storedData = JSON.parse(localStorage.getItem('userData')) || [];
    const lastUser = storedData[storedData.length - 1];

    if (lastUser) {
      lastUser.result = { score, questions }; 
      localStorage.setItem('userData', JSON.stringify(storedData));
      setIsResultSaved(true); 
    } else {
      console.error('No last user found to save results');
    }
  };

  const handleViewDetail = () => {
    if (isResultSaved) {
      const storedData = JSON.parse(localStorage.getItem('userData')) || [];
      const lastUser = storedData[storedData.length - 1];

      if (lastUser && lastUser.result) {
        navigate('/viewdetail', { state: { result: lastUser.result } }); 
      } else {
        console.error('No results available for the last user');
      }
    } else {
      console.error('Result is not saved yet.');
    }
  };
  
  return (
    <div className="result-container">
      <h2>Quiz Results</h2>
      <p>Your total score: {score} </p>
      <p>Total Questions: {questions.length}</p>
      <button onClick={handleRestart}>Restart Quiz</button>
      <button onClick={handleViewDetail} disabled={!isResultSaved}>
        View Detail
      </button>
    </div>
  );
}

export default QuizResult;
