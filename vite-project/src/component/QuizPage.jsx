import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nextQuestion, setSelectedOption } from '../features/quizSlice';
import { useNavigate } from 'react-router-dom';

function QuizPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { questions, currentQuestionIndex, selectedOption } = useSelector((state) => state.quiz);

  if (!questions || questions.length === 0) {
    return <div>No questions found. Please start the quiz again.</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      dispatch(nextQuestion());
    } else {
      navigate('/result');
    }
  };

  return (
    <div className="quiz-container">
      <h2>Quiz App</h2>
      <div className="question">
        <span>{currentQuestionIndex + 1}.</span>
        <span dangerouslySetInnerHTML={{ __html: currentQuestion.question }}></span>
      </div>
      <div className="choices">
        {currentQuestion.incorrect_answers.concat(currentQuestion.correct_answer).map((choice, i) => (
          <button
            key={i}
            className={selectedOption === choice ? 'checked' : null}
            onClick={() => dispatch(setSelectedOption(choice))}
          >
            <span dangerouslySetInnerHTML={{ __html: choice }}></span>
          </button>
        ))}
      </div>
      <button type="submit" onClick={handleNextQuestion}>
        Next
      </button>
    </div>
  );
}

export default QuizPage;
