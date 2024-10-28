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
    <div className="p-4">
      {/* Flex container para os botões */}
      <div className="flex justify-between items-center mb-4 w-full">
        <RefreshButton onRefresh={onRefresh} />
        <UploadButton onUploadSuccess={onRefresh} />
      </div>
      {/* Gráfico */}
      <VoteEvolutionBarChart key={refreshKey} />
    </div>
  );
};

export default Dashboard;
