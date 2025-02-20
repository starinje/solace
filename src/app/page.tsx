"use client";

import { useEffect, useState } from "react";

interface Advocate {
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: number;
  phoneNumber: number;
}

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAdvocates = async () => {
      try {
        const response = await fetch("/api/advocates");
        if (!response.ok) {
          throw new Error("Failed to fetch advocates");
        }
        const { data } = await response.json();
        setAdvocates(data);
        setFilteredAdvocates(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdvocates();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = advocates.filter((advocate) => {
      return (
        advocate.firstName.toLowerCase().includes(term) ||
        advocate.lastName.toLowerCase().includes(term) ||
        advocate.city.toLowerCase().includes(term) ||
        advocate.degree.toLowerCase().includes(term) ||
        advocate.specialties.some(s => s.toLowerCase().includes(term)) ||
        advocate.yearsOfExperience.toString().includes(term)
      );
    });

    setFilteredAdvocates(filtered);
  };

  const handleReset = () => {
    setSearchTerm("");
    setFilteredAdvocates(advocates);
  };

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">Solace Advocates</h1>
      
      <div className="mb-6">
        <p className="mb-2">Search</p>
        <p className="mb-2">
          Searching for: <span>{searchTerm}</span>
        </p>
        <div className="flex gap-2">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            className="border border-gray-300 rounded px-2 py-1"
            placeholder="Search advocates..."
          />
          <button
            onClick={handleReset}
            className="bg-gray-200 px-4 py-1 rounded"
          >
            Reset Search
          </button>
        </div>
      </div>

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
          {filteredAdvocates.map((advocate, index) => (
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
    </main>
  );
}
