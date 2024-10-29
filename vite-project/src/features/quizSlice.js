import { createSlice } from '@reduxjs/toolkit';

const quizSlice = createSlice({
  name: 'quiz',
  initialState: {
    questions: [],
    currentQuestionIndex: 0,
    selectedOption: null,
    score: 0, 
  },
  reducers: {
    setQuestions(state, action) {
      state.questions = action.payload;
      state.currentQuestionIndex = 0; 
      state.selectedOption = null;
      state.score = 0; 
    },
    nextQuestion(state) {
      const currentQuestion = state.questions[state.currentQuestionIndex];
      if (state.selectedOption === currentQuestion.correct_answer) {
        state.score += 1;
      }
      state.currentQuestionIndex += 1;
      state.selectedOption = null; 
    },
    setSelectedOption(state, action) {
      state.selectedOption = action.payload;
    },
    resetQuiz(state) {
      state.questions = [];
      state.currentQuestionIndex = 0;
      state.selectedOption = null;
      state.score = 0;
    },
  },
});

export const { setQuestions, nextQuestion, setSelectedOption, resetQuiz } = quizSlice.actions;

export default quizSlice.reducer;
