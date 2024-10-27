import React from 'react';

export interface Filters {
  clientNumber: string;
  startDate: string;
  endDate: string;
}

interface FilterBarProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, setFilters }) => {
  const handleClientNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, clientNumber: e.target.value });
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, startDate: e.target.value });
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, endDate: e.target.value });
  };

  const handleReset = () => {
    setFilters({ clientNumber: '', startDate: '', endDate: '' });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Client Number"
        value={filters.clientNumber}
        onChange={handleClientNumberChange}
      />
      <input
        type="date"
        placeholder="Start Date"
        value={filters.startDate}
        onChange={handleStartDateChange}
      />
      <input
        type="date"
        placeholder="End Date"
        value={filters.endDate}
        onChange={handleEndDateChange}
      />
      <button onClick={handleReset}>Reset Filters</button>
    </div>
  );
};

export default FilterBar;
