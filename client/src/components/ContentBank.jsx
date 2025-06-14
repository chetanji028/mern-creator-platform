import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

function ContentBank() {
  const [ideas, setIdeas] = useState([]);
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      fetchIdeas();
    }
  }, [user]);

  const fetchIdeas = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/idea/content-bank', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setIdeas(res.data);
    } catch (err) {
      setError('Failed to fetch content bank');
    }
  };

  if (!user) return <p>Please login to view content bank</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Content Bank</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ideas.map((idea) => (
          <div key={idea._id} className="bg-white p-4 rounded shadow">
            <h3 className="text-xl">Topic: {idea.topic}</h3>
            <p>Niche: {idea.niche}</p>
            <p>Reel Idea: {idea.reelIdea}</p>
            <p>Caption: {idea.caption}</p>
            <p>Hook: {idea.hook}</p>
            <p>Hashtags: {idea.hashtags.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ContentBank;