// Import required packages
import { useEffect, useState } from 'react';
import userService from "../../Services/UserService";
import Dashboard from "./Dashboard";

const Home = () => {

  // State
  const [product, setProduct] = useState({});

  // reload page once after login
  useEffect(() => {

    // Get reload value from local storage
    const reload = localStorage.getItem('reload');
    if (!reload) {
      localStorage.setItem('reload', 'true');
      window.location.reload();
    }
  }, []);

  useEffect(() => {
    // Function to get all products
    const getProducts = async () => {
      try {
        const response = await userService.allProducts();

        if (response.status === 200 || response.status === 201) {
          setProduct(response.data);
        }
      } catch (err) {
        console.error(err);
      }
    }

    // Call the function
    getProducts();
  }, []);

  return (
    <>
      {
        product ? (
          <Dashboard data={product} />
        ) : (
          <div className="container" style={{ height: "90vh" }}>
            <div className="d-flex justify-content-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        )
      }
    </>
  );
}

export default Home;
