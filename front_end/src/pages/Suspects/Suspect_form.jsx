import React, { useState } from 'react';
import toast from 'react-hot-toast';

function SuspectForm() {
  const [suspectDetails, setSuspectDetails] = useState({
    suspect_id: "",
    name: "",
    caseName: "",
    details: "",
    image: null,
  });

  const [isLoading, setIsLoading] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for empty required fields
    if (!suspectDetails.suspect_id || !suspectDetails.name || !suspectDetails.caseName || !suspectDetails.details || !suspectDetails.image) {
      toast.error("All fields, including the image, are required.");
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append("suspect_id", suspectDetails.suspect_id);
    formData.append("name", suspectDetails.name);
    formData.append("caseName", suspectDetails.caseName);
    formData.append("details", suspectDetails.details);
    formData.append("image", suspectDetails.image);

    try {
      const response = await fetch('/api/suspects', {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to add suspect");

      const data = await response.json();
      toast.success("Suspect added successfully");
      setSuspectDetails({
        suspect_id: "",
        name: "",
        caseName: "",
        details: "",
        image: null,
      });
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to add suspect");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-start pt-2 ">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-5xl"
        encType="multipart/form-data"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Add New Suspect</h2>

        <div className="flex space-x-4 items-end">
          <div className="flex flex-col w-2/12">
            <label className="text-gray-700 text-sm font-semibold mb-1" htmlFor="suspect_id">
              Suspect ID
            </label>
            <input
              type="text"
              id="suspect_id"
              name="suspect_id"
              placeholder="Suspect ID"
              value={suspectDetails.suspect_id}
              onChange={handleChange}
              className="shadow border rounded-md py-2 px-3 text-gray-700 focus:outline-none w-full"
              required
            />
          </div>

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

          <div className="flex flex-col w-1/5">
            <label className="text-gray-700 text-sm font-semibold mb-1" htmlFor="details">
              Crimes
            </label>
            <input
              type="text"
              id="details"
              name="details"
              value={suspectDetails.details}
              onChange={handleChange}
              className="shadow border rounded-md py-2 px-3 text-gray-700 focus:outline-none w-full"
              placeholder="Crimes Committed"
              required
            />
          </div>

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
              required
            />
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md focus:outline-none"
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Submit'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SuspectForm;
