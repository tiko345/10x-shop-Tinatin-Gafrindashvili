import { useAuth } from "../context/AuthContext";

function Profile() {
  const { user } = useAuth();

  return(
    <>
     <h1>Welcome, {user}!</h1>
    </>
  );
}

export default Profile;