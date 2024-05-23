// import required packages
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../../Services/UserService";
import UserNav from "../Wrappers/UserNav";
import AdminNav from "../Wrappers/AdminNav";

const Navbar = () => {
  // State
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // define navigate
  const navigate = useNavigate();

  // useEffect for checking if user is logged in and getting user data
  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      setIsLoading(false);
      return navigate("/login");
    }

    // Get current logged in user
    const fetchCurrentUser = async () => {
      try {
        const response = await userService.currentUser();
        setIsLogged(true);
        setUser(response.data);

      } catch (err) {
        console.log(err);
        setIsLogged(false);

        if(err.response.data.message == "jwt expired"){
          navigate("/login");
        }

      } finally {
        setIsLoading(false);
      }
    };

    fetchCurrentUser();
  }, [navigate]);

  // Function to handle logout
  const handleLogout = async () => {
    try {
      // call logout api
      await userService.logout();

      // clear token from local storage
      localStorage.removeItem("authToken");

      setIsLogged(false);
      setUser({});

      // redirect to login page
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="container" style={{ height: "90vh" }}>
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      ) : (
        <>
          {isLogged ? (
            <>
              {user.role === "user" ? (
                <UserNav user={user} handleLogout={handleLogout} />
              ) : (
                <AdminNav user={user} handleLogout={handleLogout} />
              )}
            </>
          ) : null}
        </>
      )}
    </>
  );
};

export default Navbar;
