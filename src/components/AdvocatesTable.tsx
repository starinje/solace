import { Advocate } from '../types/advocate';

interface AdvocatesTableProps {
  advocates: Advocate[];
}

export function AdvocatesTable({ advocates }: AdvocatesTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="w-full border-collapse bg-white text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-700 bg-gray-100">
              First Name
            </th>
            <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-700 bg-gray-100">
              Last Name
            </th>
            <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-700 bg-gray-100">
              City
            </th>
            <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-700 bg-gray-100">
              Degree
            </th>
            <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-700 bg-gray-100">
              Specialties
            </th>
            <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-700 bg-gray-100">
              Experience
            </th>
            <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-700 bg-gray-100">
              Phone
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {advocates.map((advocate, index) => (
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
              <td className="px-4 py-3 text-gray-900">
                {advocate.phoneNumber.toString().replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 