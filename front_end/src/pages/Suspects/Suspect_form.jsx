import React, { useState } from 'react';

function SuspectForm() {
  const [suspectDetails, setSuspectDetails] = useState({
    name: "",
    caseName: "",
    crimes: "",
    image: null,
  });

  // Auto-incrementing suspect ID (for demonstration)
  const [suspectID, setSuspectID] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSuspectDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setSuspectDetails((prevDetails) => ({
      ...prevDetails,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Suspect Details:", suspectDetails, "Suspect ID:", suspectID);

    // Increment suspect ID after submission
    setSuspectID((prevID) => prevID + 1);
  };

  return (
    <div className="flex justify-center items-start pt-2 min-h-screen bg-gradient-to-r from-blue-200 to-purple-300">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-5xl"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Add New Suspect</h2>

        <div className="flex space-x-4 items-end">
          {/* Suspect ID */}
          <div className="flex flex-col w-2/12">
            <label className="text-gray-700 text-sm font-semibold mb-1" htmlFor="suspect_id">
              Suspect ID
            </label>
            <input
              type="text"
              id="suspect_id"
              value={suspectID}
              disabled
              className="shadow border rounded-md py-2 px-3 bg-gray-100 text-gray-700 w-full"
            />
          </div>

          {/* Name */}
          <div className="flex flex-col w-1/5">
            <label className="text-gray-700 text-sm font-semibold mb-1" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={suspectDetails.name}
              onChange={handleChange}
              className="shadow border rounded-md py-2 px-3 text-gray-700 focus:outline-none w-full"
              placeholder="Suspect Name"
              required
            />
          </div>

          {/* Case Name */}
          <div className="flex flex-col w-1/5">
            <label className="text-gray-700 text-sm font-semibold mb-1" htmlFor="caseName">
              Case Name
            </label>
            <input
              type="text"
              id="caseName"
              name="caseName"
              value={suspectDetails.caseName}
              onChange={handleChange}
              className="shadow border rounded-md py-2 px-3 text-gray-700 focus:outline-none w-full"
              placeholder="Case Name"
              required
            />
          </div>

          {/* Crimes */}
          <div className="flex flex-col w-1/5">
            <label className="text-gray-700 text-sm font-semibold mb-1" htmlFor="crimes">
              Crimes
            </label>
            <input
              type="text"
              id="crimes"
              name="crimes"
              value={suspectDetails.crimes}
              onChange={handleChange}
              className="shadow border rounded-md py-2 px-3 text-gray-700 focus:outline-none w-full"
              placeholder="Crimes Committed"
              required
            />
          </div>

          {/* Image Upload */}
          <div className="flex flex-col w-1/3">
            <label className="text-gray-700 text-sm font-semibold mb-1" htmlFor="image">
              Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
              className="shadow border rounded-md py-2 px-3 text-gray-700 focus:outline-none w-full"
              accept="image/*"
            />
          </div>
          {/* Submit Button */}
        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md focus:outline-none"
          >
            Submit
          </button>
        </div>
        </div>

        
      </form>
    </div>
  );
}

export default SuspectForm;
