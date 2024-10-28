import React, { useState } from 'react';
import { api } from '../api/api';

interface RefreshButtonProps {
  onRefresh: () => void;
}

const RefreshButton: React.FC<RefreshButtonProps> = ({ onRefresh }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleRefreshClick = async () => {
    try {
      setIsLoading(true);
      await api.put('/city/update');
      alert('Dados atualizados com sucesso!');
      onRefresh();
    } catch (error) {
      console.error('Erro ao atualizar os dados:', error);
      alert('Erro ao atualizar os dados.');
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <button
      onClick={handleRefreshClick}
      className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100 shadow-md inline-block"
    >
      {isLoading ? 'Atualizando...' : 'Atualizar dados'}
    </button>
  );
};

export default RefreshButton;
