import { useAuth } from "../context/AuthContext";
import Header from "../components/layout/Header.tsx";

function Profile() {
  const { user } = useAuth();

  return(
    <>
     <h1>Welcome, {user}!</h1>
    </>
  );
}

export default Profile;