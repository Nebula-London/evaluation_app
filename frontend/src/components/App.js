import React, { useState } from 'react';
import QuestionBox from './QuestionBox';
import AnswerBox from './AnswerBox';
import EvaluationBox from './EvaluationBox';
import axios from 'axios';
import './App.css'; // Import CSS for layout

function App() {
  const [question, setQuestion] = useState('What is the meaning of life?');
  const [evaluation, setEvaluation] = useState('');
  const [rating, setRating] = useState(null);

  const handleAnswerSubmit = async (answer) => {
    try {
// Replace with your backend endpoint
      const response = await axios.post('http://localhost:8080/evaluate', {
        question: question,
        answer: answer,
      });

      setEvaluation(response.data.evaluation);
      setRating(response.data.rating);
    } catch (error) {
      console.error('Error evaluating answer:', error);
      setEvaluation('Error evaluating answer.');
      setRating(null);
    }
  };

  return (
    <div>
      <QuestionBox question={question} />
      <AnswerBox onAnswerSubmit={handleAnswerSubmit} />
      <EvaluationBox evaluation={evaluation} rating={rating} />
      <button>Submit</button>
    </div>
  );
}

export default App;