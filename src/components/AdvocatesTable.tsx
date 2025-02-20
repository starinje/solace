import { Advocate } from '../types/advocate';

interface AdvocatesTableProps {
  advocates: Advocate[];
}

export function AdvocatesTable({ advocates }: AdvocatesTableProps) {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr>
          <th className="text-left p-2">First Name</th>
          <th className="text-left p-2">Last Name</th>
          <th className="text-left p-2">City</th>
          <th className="text-left p-2">Degree</th>
          <th className="text-left p-2">Specialties</th>
          <th className="text-left p-2">Years of Experience</th>
          <th className="text-left p-2">Phone Number</th>
        </tr>
      </thead>
      <tbody>
        {advocates.map((advocate, index) => (
          <tr key={index} className="border-t">
            <td className="p-2">{advocate.firstName}</td>
            <td className="p-2">{advocate.lastName}</td>
            <td className="p-2">{advocate.city}</td>
            <td className="p-2">{advocate.degree}</td>
            <td className="p-2">
              {advocate.specialties.map((specialty, i) => (
                <div key={i} className="mb-1">{specialty}</div>
              ))}
            </td>
            <td className="p-2">{advocate.yearsOfExperience}</td>
            <td className="p-2">{advocate.phoneNumber}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
} 