import React from 'react';

interface SearchBarProps {
  searchTerm: string;
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
}

export function SearchBar({ searchTerm, onSearch, onReset }: SearchBarProps) {
  return (
    <div className="mb-6">
      <p className="mb-2">Search</p>
      <p className="mb-2">
        Searching for: <span>{searchTerm}</span>
      </p>
      <div className="flex gap-2">
        <input
          type="text"
          value={searchTerm}
          onChange={onSearch}
          className="border border-gray-300 rounded px-2 py-1"
          placeholder="Search advocates..."
        />
        <button
          onClick={onReset}
          className="bg-gray-200 px-4 py-1 rounded"
        >
          Reset Search
        </button>
      </div>
    </div>
  );
} 