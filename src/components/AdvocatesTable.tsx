import { Advocate } from '../types/advocate';
import { SortConfig, SortField, SortDirection } from '../types/sorting';
import { useState } from 'react';

interface AdvocatesTableProps {
  advocates: Advocate[];
}

export function AdvocatesTable({ advocates }: AdvocatesTableProps) {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: 'firstName',
    direction: 'asc'
  });

  const handleSort = (field: SortField) => {
    setSortConfig(prevConfig => ({
      field,
      direction: prevConfig.field === field && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const getSortedAdvocates = () => {
    return [...advocates].sort((a, b) => {
      const aValue = a[sortConfig.field];
      const bValue = b[sortConfig.field];
      
      if (sortConfig.direction === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  };

  const getSortIcon = (field: SortField) => {
    if (sortConfig.field !== field) {
      return (
        <span className="inline-flex ml-2 text-gray-400">
          <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </span>
      );
    }
    return sortConfig.direction === 'asc' ? (
      <span className="inline-flex ml-2 text-blue-600">
        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
      </span>
    ) : (
      <span className="inline-flex ml-2 text-blue-600">
        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </span>
    );
  };

  const sortableHeaderClass = "cursor-pointer hover:bg-gray-200 transition-colors";

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="w-full border-collapse bg-white text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th 
              onClick={() => handleSort('firstName')}
              className={`px-4 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-700 bg-gray-100 ${sortableHeaderClass}`}
            >
              <div className="flex items-center">
                First Name {getSortIcon('firstName')}
              </div>
            </th>
            <th 
              onClick={() => handleSort('lastName')}
              className={`px-4 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-700 bg-gray-100 ${sortableHeaderClass}`}
            >
              <div className="flex items-center">
                Last Name {getSortIcon('lastName')}
              </div>
            </th>
            <th 
              onClick={() => handleSort('city')}
              className={`px-4 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-700 bg-gray-100 ${sortableHeaderClass}`}
            >
              <div className="flex items-center">
                City {getSortIcon('city')}
              </div>
            </th>
            <th 
              onClick={() => handleSort('degree')}
              className={`px-4 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-700 bg-gray-100 ${sortableHeaderClass}`}
            >
              <div className="flex items-center">
                Degree {getSortIcon('degree')}
              </div>
            </th>
            <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-700 bg-gray-100">
              Specialties
            </th>
            <th 
              onClick={() => handleSort('yearsOfExperience')}
              className={`px-4 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-700 bg-gray-100 ${sortableHeaderClass}`}
            >
              <div className="flex items-center">
                Experience {getSortIcon('yearsOfExperience')}
              </div>
            </th>
            <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-700 bg-gray-100 whitespace-nowrap">
              Phone
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {getSortedAdvocates().map((advocate, index) => (
            <tr 
              key={index} 
              className={`hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
            >
              <td className="px-4 py-3 text-gray-900">{advocate.firstName}</td>
              <td className="px-4 py-3 text-gray-900">{advocate.lastName}</td>
              <td className="px-4 py-3 text-gray-900">{advocate.city}</td>
              <td className="px-4 py-3 text-gray-900">{advocate.degree}</td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap gap-1">
                  {advocate.specialties.map((specialty, i) => (
                    <span 
                      key={i} 
                      className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </td>
              <td className="px-4 py-3 text-gray-900">{advocate.yearsOfExperience} years</td>
              <td className="px-4 py-3 text-gray-900 whitespace-nowrap">
                {advocate.phoneNumber.toString().replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 