import React, { useEffect, useState } from 'react';
import Categories from '../data/categories';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setQuestions } from '../features/quizSlice';
import { useNavigate } from 'react-router-dom';

function SelectPage() {
  const [amount, setAmount] = useState(10);
  const [category, setCategory] = useState(9);
  const [difficulty, setDifficulty] = useState('easy');
  const [type, setType] = useState('multiple');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchQuestions = async () => {
    const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`;
    try {
      const response = await axios.get(url);
      dispatch(setQuestions(response.data.results)); 
      navigate('/quizpage');
    } catch (error) {
      console.log('Error Fetching Trivia Question', error);
    }
  };

 const saveQuizSelectOption=()=>{
   const storedData = JSON.parse(localStorage.getItem('userData')) || []
   const lastUser = storedData[storedData.length - 1]
   console.log(lastUser);
   
   if (lastUser) {
    lastUser.quizOption= {amount,category,difficulty,type}
   }
   localStorage.setItem('userData' , JSON.stringify(storedData))
 }

  const handleStartQuiz = () => {
    fetchQuestions();
    saveQuizSelectOption(); 
  };
  

  return (
    <div className='quiz-container'>
      <h2>Select Quiz Option</h2>
      <div>
        <label>Number of Questions:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min={1}
          max={50}
        />
      </div>
      <div>
        <label>Category:</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {Categories.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.category}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Difficulty:</label>
        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <div>
        <label>Type:</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="multiple">Multiple Choice</option>
          <option value="boolean">True / False</option>
        </select>
      </div>
      <button onClick={handleStartQuiz}>Start Quiz</button>
    </div>
  );
}

export default SelectPage;
