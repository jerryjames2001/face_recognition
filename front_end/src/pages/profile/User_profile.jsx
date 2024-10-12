import { useContext } from 'react';
import { UserContext } from '../../../context/UserContext';

function UserProfile() {
  const { user } = useContext(UserContext);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Address: {user.address}</p>
      {/* You can include any other user details here */}
    </div>
  );
}

export default UserProfile;
