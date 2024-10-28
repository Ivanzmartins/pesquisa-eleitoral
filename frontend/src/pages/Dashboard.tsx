import React, { useState } from 'react';
import VoteEvolutionBarChart from '../components/VoteEvolutionChart';
import UploadButton from '../components/UploadButton';
import RefreshButton from '../components/RefreshButton';

const Dashboard: React.FC = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const onRefresh = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  return (
    <div className="w-full p-4">
      <div className="flex justify-between items-center mb-4">
        <RefreshButton onRefresh={onRefresh} />
        <UploadButton onUploadSuccess={onRefresh} />
      </div>
      <div className="w-[80%] mx-auto">
        <VoteEvolutionBarChart key={refreshKey} />
      </div>
    </div>
  );
};

export default Dashboard;
