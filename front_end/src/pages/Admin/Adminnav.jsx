import React from 'react'
import { Link } from 'react-router-dom'

function Adminnav() {
    return (
        <div className="w-64 h-screen bg-gray-800 text-white">
            <div className="p-4">
                <h2 className="text-2xl font-semibold">Admin Dashboard</h2>
            </div>
            <ul className="justify-between pt-4 text-center">
                <li className="hover:bg-gray-700 p-3 py-8">
                    <Link to="" className="block">Dashboard Home</Link>
                </li>
                <li className="hover:bg-gray-700 p-3 py-8">
                    <Link to="" className="block">User Management</Link>
                </li>
                <li className="hover:bg-gray-700 p-3 py-8">
                    <Link to="" className="block">Camera Management</Link>
                </li>
                <li className="hover:bg-gray-700 p-3 py-8">
                    <Link to="" className="block">Logs</Link>
                </li>
                <li className="hover:bg-gray-700 p-3 py-8 font-bold text-lg">
                    <Link to="" className="block">Log out</Link>
                </li>
            </ul>
        </div>
    )
}

export default Adminnav