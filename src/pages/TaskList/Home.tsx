import { Link } from 'react-router-dom';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

const Home = () => {
  const data = [
    {
      User: 'Rimon Ron',
      A: 120,
      B: 110,
      fullMark: 150,
    },
    {
      User: 'David Williams',
      A: 98,
      B: 130,
      fullMark: 150,
    },
    {
      User: 'Emily Johnson',
      A: 86,
      B: 130,
      fullMark: 150,
    },
    {
      User: 'Michael Brown',
      A: 99,
      B: 100,
      fullMark: 150,
    },
    {
      User: 'Sarah Davis',
      A: 85,
      B: 90,
      fullMark: 150,
    },
    {
      User: 'Olivia Lee',
      A: 90,
      B: 85,
      fullMark: 150,
    },
  ];

  return (
    <div className="m-5">
      <h2 className="font-semibold text-xl mb-3">Hello sir, Welcome Back!! Please Click on <Link to="/task-list" className='text-gray-600'>Task Lists</Link></h2>
      <ResponsiveContainer width="100%" height={400}>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="User" />
          <PolarRadiusAxis />
          <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Home;
