import { Advocate } from '../types/advocate';
import { SortConfig, SortField, SortDirection } from '../types/sorting';
import { useState } from 'react';
import { BiSortAlt2, BiSortUp, BiSortDown } from 'react-icons/bi';

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
          <BiSortAlt2 size={18} />
        </span>
      );
    }
    return sortConfig.direction === 'asc' ? (
      <span className="inline-flex ml-2 text-blue-600">
        <BiSortUp size={18} />
      </span>
    ) : (
      <span className="inline-flex ml-2 text-blue-600">
        <BiSortDown size={18} />
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
              <div className="flex items-center whitespace-nowrap">
                First Name {getSortIcon('firstName')}
              </div>
            </th>
            <th 
              onClick={() => handleSort('lastName')}
              className={`px-4 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-700 bg-gray-100 ${sortableHeaderClass}`}
            >
              <div className="flex items-center whitespace-nowrap">
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
                      className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 hover:bg-blue-100 hover:text-blue-800 transition-colors cursor-default"
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