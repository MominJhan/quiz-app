import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QuizPage from './component/QuizPage';
import QuizResult from './component/QuizResult';
import SelectPage from './component/SelectPage';
import Login from './component//Login';
import ViewDeatil from './component/ViewDetail';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/selectpage" element={<SelectPage/>} />
        <Route path="/quizpage" element={<QuizPage/>} />
        <Route path="/result" element={<QuizResult/>} />
        <Route path="/" element={<Login/>} />
        <Route path="/viewdetail" element={<ViewDeatil/>} />

      </Routes>
    </Router>
  );
}

export default App;
