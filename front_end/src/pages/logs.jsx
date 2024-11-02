import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Nav2 from './Nav/nav2'

function logs() {
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch('/api/logs');
        if (!response.ok) throw new Error('Failed to fetch logs');

        const data = await response.json();
        setLogs(data);
      } catch (error) {
        console.error("Error fetching logs:", error);
        toast.error(error.message || 'Error fetching logs');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLogs();
  }, []);

  if (isLoading) return <p>Loading logs...</p>;
  const backendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

  return (
    <div className='bg-sky-200 min-h-screen '>
      <div>
        <Nav2 />
      </div>
      <div className="log-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {logs.map(log => (
          <div key={log._id} className="bg-white shadow-lg rounded-lg p-4">
            <h3 className="text-lg font-bold text-center">{log.suspectDetails?.name || 'Unknown'}</h3>
            <p><strong>Suspect ID:</strong> {log.suspect_id}</p>
            <p><strong>Case Name:</strong> {log.suspectDetails?.caseName || 'N/A'}</p>
            <p><strong>Details:</strong> {log.suspectDetails?.details || 'N/A'}</p>
            <p><strong>Log Time:</strong> {new Date(log.time).toLocaleString()}</p>
            <p><strong>Camera ID:</strong> {log.cam_id}</p>


            {log.screenshot && (
             <img
             src={`${backendURL}/logs/${log.screenshot}`} // Assuming backendURL is set to the correct backend address
             alt={`Log Screenshot ${log.screenshot}`}
             className="w-full h-52 object-cover mt-4 rounded-md"
           />
           
            
            
            )}


          </div>
        ))}
      </div>
    </div>
  )
}

export default logs