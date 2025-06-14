import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { AuthContext } from '../context/AuthContext';
import { saveAs } from 'file-saver';

function AnalyticsDashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      fetchAnalytics();
    }
  }, [user]);

  const fetchAnalytics = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/analytics/data', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setData(res.data);
    } catch (err) {
      setError('Failed to fetch analytics');
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const newData = JSON.parse(event.target.result);
        await axios.post('http://localhost:5000/api/analytics/upload', newData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setData(newData);
      } catch (err) {
        setError('Failed to upload analytics');
      }
    };
    reader.readAsText(file);
  };

  const exportReport = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    saveAs(blob, 'analytics-report.json');
  };

  if (!user) return <p>Please login to view analytics</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!data) return <p>Loading...</p>;

  const followerData = data.followers.map((count, index) => ({
    day: `Day ${index + 1}`,
    followers: count,
  }));

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Instagram Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-xl mb-2">Follower Growth (7 Days)</h3>
          <LineChart width={400} height={200} data={followerData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="followers" stroke="#8884d8" />
          </LineChart>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-xl mb-2">Engagement Rate</h3>
          {data.engagement.map((post) => (
            <div key={post.post} className="mb-2">
              <p>Post {post.post}: {post.likes} Likes, {post.comments} Comments</p>
            </div>
          ))}
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-xl mb-2">Best Time to Post</h3>
          <p>{data.bestPostTime}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-xl mb-2">Upload New Analytics</h3>
          <input type="file" accept=".json" onChange={handleUpload} />
          <button
            onClick={exportReport}
            className="mt-4 bg-blue-600 text-white p-2 rounded"
          >
            Export Report
          </button>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsDashboard;