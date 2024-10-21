import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/auth-context'

function Adminnav() {
    const { signOut } = useAuth()
    return (
        <div className="w-64 h-screen bg-gray-800 text-white">
            <div className="p-4">
                <h2 className="text-2xl font-semibold">Admin Dashboard</h2>
            </div>
            <ul className="justify-between pt-4 text-center">
                <li className="hover:bg-gray-700 p-3 py-8">
                    <Link to="/dashboard" className="block">Dashboard Home</Link>
                </li>
                <li className="hover:bg-gray-700 p-3 py-8">
                    <Link to="/usermanagement" className="block">User Management</Link>
                </li>
                <li className="hover:bg-gray-700 p-3 py-8">
                    <Link to="/camera" className="block">Camera Management</Link>
                </li>
                <li className="hover:bg-gray-700 p-3 py-8">
                    <Link to="/logs" className="block">Logs</Link>
                </li>
                <li className="hover:bg-gray-700 p-3 py-8 font-bold text-lg"
                onClick={signOut}>
                    Log out
                </li>
            </ul>
        </div>
    )
}

export default Adminnav