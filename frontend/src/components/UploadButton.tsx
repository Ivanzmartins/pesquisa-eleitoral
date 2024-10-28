import React, { useRef, useState } from 'react';
import { api } from '../api/api';

interface UploadButtonProps {
  onUploadSuccess: () => void;
}

const UploadButton: React.FC<UploadButtonProps> = ({ onUploadSuccess }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        setIsLoading(true);
        await api.post('/poll', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        alert('Arquivo enviado com sucesso!');
        onUploadSuccess();
      } catch (error) {
        console.error('Erro ao enviar o arquivo:', error);
        alert('Erro ao enviar o arquivo.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <button
        onClick={handleUploadClick}
        className="inline-block bg-black text-white px-4 py-2 rounded hover:bg-gray-700 shadow-md"
      >
        {isLoading ? 'Enviando...' : 'Importar dados'}
      </button>

      <input
        type="file"
        accept=".csv"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </>
  );
};

export default UploadButton;
