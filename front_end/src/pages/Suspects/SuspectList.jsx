import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

function SuspectList() {
  const [suspects, setSuspects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSuspects = async () => {
      try {
        const response = await fetch('/api/suspects');
        if (!response.ok) throw new Error('Failed to fetch suspects');
        
        const data = await response.json();
        setSuspects(data);
      } catch (error) {
        console.error("Error fetching suspects:", error);
        toast.error(error)
      } finally {
        setIsLoading(false);
      }
    };

    fetchSuspects();
  }, []);

  if (isLoading) return <p>Loading suspects...</p>;

  return (
    <div className="suspect-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 ">
      {suspects.map(suspect => (
        <div key={suspect._id} className="bg-white shadow-lg rounded-lg p-4">
          <h3 className="text-lg font-bold text-center">{suspect.name}</h3>
          <p><strong>ID:</strong> {suspect.suspect_id}</p>
          <p><strong>Case Name:</strong> {suspect.caseName}</p>
          <p><strong>Details:</strong> {suspect.details}</p>
          {suspect.image?.data && (
            <img
              src={suspect.image.data}
              alt={`${suspect.name}'s image`}
              className="w-full h-52 object-cover mt-4 rounded-md"
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default SuspectList;
