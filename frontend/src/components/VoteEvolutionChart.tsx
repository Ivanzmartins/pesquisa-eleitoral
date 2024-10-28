import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { getPollData } from '../api/pollData';
import { transformData } from '../utils/transformData';

const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#d0ed57'];

const VoteEvolutionBarChart: React.FC = () => {
  const [chartData, setChartData] = useState<any[]>([]);
  const [candidates, setCandidates] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPollData();
        const transformed = transformData(data);
        setChartData(transformed);

        // Extrai os nomes dos candidatos
        const candidateSet = new Set<string>();
        data.forEach((item) => {
          candidateSet.add(item.candidate_name);
        });
        setCandidates(Array.from(candidateSet));
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };// export const

    fetchData();
  }, []);

  return (
    <div style={{ width: '100%', height: 300 }}>
      <h2>Evolução Temporal das Intenções de Votos</h2>
      <ResponsiveContainer>
        <BarChart data={chartData}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          {candidates.map((candidate, index) => (
            <Bar
              key={candidate}
              dataKey={candidate}
              fill={colors[index % colors.length]}
              name={candidate}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VoteEvolutionBarChart;
