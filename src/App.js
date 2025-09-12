import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/polls/")
      .then(res => setPolls(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleVote = (pollId, optionId) => {
    axios.post(`http://127.0.0.1:8000/api/polls/${pollId}/vote/`, { option_id: optionId })
      .then(() => {
        alert("Vote submitted!");
        window.location.reload();
      })
      .catch(err => console.error(err));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Voting App</h1>
      {polls.map(poll => (
        <div key={poll.id} style={{ marginBottom: "30px" }}>
          <h3>{poll.question}</h3>
          {poll.options.map(option => (
            <div key={option.id}>
              <button onClick={() => handleVote(poll.id, option.id)}>
                {option.text}
              </button>
              <span> — {option.votes} votes</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
