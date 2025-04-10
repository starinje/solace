import React from 'react';

interface SearchBarProps {
  searchTerm: string;
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
}

export function SearchBar({ searchTerm, onSearch, onReset }: SearchBarProps) {
  return (
    <div className="flex items-center gap-4">
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={onSearch}
          className="border border-gray-300 rounded px-3 py-2"
          placeholder="Search advocates..."
        />
      </div>
      {searchTerm && (
        <button
          onClick={onReset}
          className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition-colors"
        >
          Reset
        </button>
      )}
    </div>
  );
} 