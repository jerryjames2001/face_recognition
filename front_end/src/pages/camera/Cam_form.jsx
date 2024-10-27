import React, { useState } from 'react';
import toast from 'react-hot-toast';

function Cam_form({ className }) {
  const [cameraDetails, setCameraDetails] = useState({
    ipaddress: "",
    location: "",
    latitude: "",
    longitude: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCameraDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading to true when submitting

    try {
      const response = await fetch('/api/cameras', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cameraDetails),
      });

      if (!response.ok) {
        throw new Error('Failed to add camera');
      }

      const data = await response.json();
      toast.success('Camera added successfully!'); // Show success message
      setCameraDetails({ // Reset the form
        ipaddress: "",
        location: "",
        latitude: "",
        longitude: "",
      });
      setTimeout(() => {
        window.location.reload();
      }, 2500);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to add camera.'); // Show error message
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div className="flex items-start max-h-screen mx-4 justify-center">
      <form 
        onSubmit={handleSubmit} 
        className={`bg-white shadow-md rounded-xl px-8 pt-6 pb-8 mb-4 w-full max-w-6xl ${className}`}
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Add New Camera</h2>

        <div className="flex space-x-4">
          {/* IP Address Input */}
          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-bold" htmlFor="ipaddress">
              IP Address
            </label>
            <input
              type="text"
              id="ipaddress"
              name="ipaddress"
              value={cameraDetails.ipaddress}
              onChange={handleChange}
              className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="IP address"
              required
            />
          </div>

          {/* Location Input */}
          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-bold" htmlFor="location">
              Location Name
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={cameraDetails.location}
              onChange={handleChange}
              className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Location name"
              required
            />
          </div>

          {/* Latitude Input */}
          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-bold" htmlFor="latitude">
              Latitude
            </label>
            <input
              type="text"
              id="latitude"
              name="latitude"
              value={cameraDetails.latitude}
              onChange={handleChange}
              className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Latitude"
              required
            />
          </div>

          {/* Longitude Input */}
          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-bold" htmlFor="longitude">
              Longitude
            </label>
            <input
              type="text"
              id="longitude"
              name="longitude"
              value={cameraDetails.longitude}
              onChange={handleChange}
              className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Longitude"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex flex-col justify-end">
            <button
              type="submit"
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isLoading} // Disable button when loading
            >
              {isLoading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Cam_form;
