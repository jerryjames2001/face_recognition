import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { MdDelete } from "react-icons/md";
import { VscDebugDisconnect } from "react-icons/vsc";

function Cam_list() {
  const [cameras, setCameras] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch cameras from the API
  useEffect(() => {
    const fetchCameras = async () => {
      try {
        const response = await fetch('/api/cameras');
        if (!response.ok) {
          throw new Error('Failed to fetch cameras');
        }
        const data = await response.json();
        setCameras(data.data); 
      } catch (error) {
        console.error('Error:', error);
        toast.error('Failed to fetch cameras.'); // Show error message
      } finally {
        setIsLoading(false); // Reset loading state
      }
    };

    fetchCameras();
  }, []);

  // Delete camera function
  const deleteCamera = async (cameraId) => {
    if (window.confirm('Are you sure you want to delete this camera?')) {
      try {
        const response = await fetch(`/api/cameras/${cameraId}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to delete camera');
        }
        // Update state to remove the deleted camera
        setCameras((prevCameras) => prevCameras.filter(camera => camera._id !== cameraId));
        toast.success('Camera deleted successfully.');
      } catch (error) {
        console.error('Error:', error);
        toast.error('Failed to delete camera.');
      }
    }
  };

  // Render loading state or camera list
  return (
    <div className="overflow-x-auto px-4 rounded-xl">
      {isLoading ? (
        <p>Loading cameras...</p>
      ) : (
        <table className="min-w-full bg-white border-none text-center rounded-xl">
          <thead>
            <tr>
              <th className="border-b border-gray-300 px-4 py-2">IP Address</th>
              <th className="border-b border-gray-300 px-4 py-2">Location</th>
              <th className="border-b border-gray-300 px-4 py-2">Latitude</th>
              <th className="border-b border-gray-300 px-4 py-2">Longitude</th>
              <th className="border-b border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cameras.map(camera => (
              <tr key={camera._id} className="hover:bg-gray-100">
                <td className="border-b border-gray-300 px-4 py-2">{camera.ipaddress}</td>
                <td className="border-b border-gray-300 px-4 py-2">{camera.location}</td>
                <td className="border-b border-gray-300 px-4 py-2">{camera.latitude}</td>
                <td className="border-b border-gray-300 px-4 py-2">{camera.longitude}</td>
                <td className="border-b border-gray-300 px-4 py-2">
                  {/* Delete button */}
                  <button className="text-red-500" onClick={() => deleteCamera(camera._id)}>
                    <MdDelete size={30} />
                  </button>
                  <button className="text-sky-600 ml-4"><VscDebugDisconnect size={30}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Cam_list;
