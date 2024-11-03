import React, { useState,useEffect } from 'react'
import Adminnav from './Adminnav'
import toast from 'react-hot-toast';
import { MdDelete } from "react-icons/md";


function Logs() {
  
  const [Logs, setLogs] = useState([]);
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

  const deleteLog = async (logId) => {
    if (window.confirm('Are you sure you want to delete this Log?')) {
      try {
        const response = await fetch(`/api/logs/${logId}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to delete log');
        }
        setLogs((prevLogs) => prevLogs.filter(log => log._id !== logId));
        toast.success('Log deleted successfully.');
      } catch (error) {
        console.error('Error:', error);
        toast.error('Failed to delete log');
      }
    }
  };

  if (isLoading) return <p>Loading logs...</p>;
  const backendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

  return (
    <div className='flex h-screen'>
      {/* Left Side: Navigation */}
      <div>
        <Adminnav />
      </div>

      {/* Right Side: Content */}
      <div className="w-4/5 overflow-y-auto p-4 bg-slate-100">
      <div className="log-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Logs.map(log => (
          <div key={log._id} className="bg-white shadow-lg rounded-lg p-4 ">
            <h3 className="text-lg font-bold text-center">{log.suspectDetails?.name || 'Unknown'}</h3>
            <p><strong>Suspect ID:</strong> {log.suspect_id}</p>
            <p><strong>Case Name:</strong> {log.suspectDetails?.caseName || 'N/A'}</p>
            <p><strong>Details:</strong> {log.suspectDetails?.details || 'N/A'}</p>
            <p><strong>Log Time:</strong> {new Date(log.time).toLocaleString()}</p>
            <p><strong>Camera ID:</strong> {log._id}</p>


            <div className="flex flex-row justify-evenly ">
              {/* Suspect Image */}
              {/* {log.suspectDetails?.image?.data && (
                <img
                  src={log.suspectDetails.image.data}
                  alt={`${log.suspectDetails.name}'s image`}
                  className="w-40 h-40 object-cover rounded-md border-2 border-gray-300 mb-2" // Smaller size for the suspect image
                />
              )} */}

              {/* Log Screenshot */}
              {log.screenshot && (
                <img
                  src={`${backendURL}/logs/${log.screenshot}`}
                  alt={`Log Screenshot ${log.screenshot}`}
                  className="w-40 h-40 object-cover rounded-md border-2 border-gray-300"
                />
              )}
              <button className='text-red-500' onClick={() => deleteLog(log._id)}><MdDelete size={30}/></button>
            </div>


          </div>
        ))}
      </div>
      </div>
    </div>
  )
}

export default Logs