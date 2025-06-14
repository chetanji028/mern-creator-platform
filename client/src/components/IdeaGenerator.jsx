import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

function IdeaGenerator() {
  const [topic, setTopic] = useState('');
  const [niche, setNiche] = useState('fashion');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return setError('Please login to generate ideas');
    setLoading(true);
    setError('');
    try {
      const res = await axios.post(
        'http://localhost:5000/api/idea/generate',
        { topic, niche },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setResult(res.data);
    } catch (err) {
      setError('Failed to generate idea');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl mb-4">Content Idea Generator</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <select
          value={niche}
          onChange={(e) => setNiche(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        >
          <option value="fashion">Fashion</option>
          <option value="fitness">Fitness</option>
          <option value="finance">Finance</option>
        </select>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate Idea'}
        </button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {result && (
        <div className="mt-6 p-4 bg-gray-100 rounded">
          <h3 className="text-xl">Reel Idea</h3>
          <p>{result.reelIdea}</p>
          <h3 className="text-xl mt-4">Caption</h3>
          <p>{result.caption}</p>
          <h3 className="text-xl mt-4">Hook</h3>
          <p>{result.hook}</p>
          <h3 className="text-xl mt-4">Hashtags</h3>
          <ul>
            {result.hashtags.map((tag, index) => (
              <li key={index}>#{tag}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default IdeaGenerator;