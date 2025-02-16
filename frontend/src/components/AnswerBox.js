// filepath: /c:/Users/DELL/Downloads/agentic_ai/evaluation site/java_flask_app/my-web-app/frontend/src/components/AnswerBox.js
import React, { useState } from 'react';

function AnswerBox({ onAnswerSubmit }) {
  const [answer, setAnswer] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAnswerSubmit(answer);
    setAnswer('');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    // Handle file upload logic here
    console.log('Selected file:', file);
  };

  return (
    <> {/* Use a React Fragment to wrap adjacent elements */}
      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleSubmit}>Submit Answer</button>
    </>
  );
}

export default AnswerBox;