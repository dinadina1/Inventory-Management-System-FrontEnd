// import required packages
import { useEffect, useState } from "react"
import userService from "../../Services/UserService";
import { useNavigate } from "react-router-dom";
import UserNav from "../Wrappers/UserNav";
import AdminNav from "../Wrappers/AdminNav";

const Navbar = () => {

  // State
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // define navigate
  const navigate = useNavigate();

  // useEffect for checking if user is logged in
  useEffect(() => {

    // get token from local storage
    const token = localStorage.getItem("authToken");

    setTimeout(() => {
      if (!token) {
        navigate("/login");
      }
      setIsLoading(false);

    }, 2000);

  }, []);


  // define useEffect
  useEffect(() => {

    // Get current logged in user
    const currentUser = async () => {
      try {
        const response = await userService.currentUser();
        if (response.status == 401 || response.status == 404) {
          navigate("/login");
        }

        // update state
        setIsLogged(true);
        setUser(response.data);
        setIsLoading(false);

      } catch (err) {

        // update state
        setIsLogged(false);
        console.log(err);
        navigate("/login");
      }
    };
    currentUser();
  }, []);

  // Function to handle logout
  const handleLogout = async () => {
    try {
      // call logout api
      await userService.logout();

      // clear token from local storage
      localStorage.removeItem("authToken");

      setIsLogged(false);
      setUser({});

      // clear hasReloaded from local storage
      // localStorage.removeItem('hasReloaded');

      // redirect to login page
      return navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };


  return (
    <>
      {
        isLoading ? (
          <div className="container" style={{ height: "90vh" }}>
            <div className="d-flex justify-content-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>

        ) : (

          <>
            {
              isLogged ? (
                <>
                  {
                    // check role
                    user.role == "user" ? (
                      <UserNav user={user} handleLogout={handleLogout} />
                    ) : (
                      <AdminNav user={user} handleLogout={handleLogout} />
                    )
                  }
                </>
              ) : null
            }
          </>
        )
      }
    </>

  )
}

export default Navbar