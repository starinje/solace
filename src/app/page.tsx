"use client";

import { useEffect, useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { AdvocatesTable } from "@/components/AdvocatesTable";
import { Advocate } from "@/types/advocate";

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
      
      <SearchBar 
        searchTerm={searchTerm}
        onSearch={handleSearch}
        onReset={handleReset}
      />

      <AdvocatesTable advocates={filteredAdvocates} />
    </main>
  );
}
