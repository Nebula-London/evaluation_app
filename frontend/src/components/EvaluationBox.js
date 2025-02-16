// filepath: /c:/Users/DELL/Downloads/agentic_ai/evaluation site/java_flask_app/my-web-app/frontend/src/components/EvaluationBox.js
import React from 'react';

function EvaluationBox({ evaluation, rating }) {
  return (
    <> {/* Use a React Fragment to wrap adjacent elements */}
      <h3>Evaluation</h3>
      <p>{evaluation}</p>
      <p>Rating: {rating} / 10</p>
    </>
  );
}

export default EvaluationBox;