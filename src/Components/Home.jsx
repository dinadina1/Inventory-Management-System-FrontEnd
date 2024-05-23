// Import required packages
import { useEffect, useState } from 'react';
// import { useLoaderData } from "react-router-dom";
import userService from "../../Services/UserService";
import Dashboard from "./Dashboard";

// Loader Function to get all products
// export const productLoader = async () => {
//   try {
//     const response = await userService.allProducts();
//     return response.data;
//   } catch (err) {
//     console.error(err.message);
//     return null;
//   }
// };

const Home = () => {
  // Define useLoaderData
  // const product = useLoaderData();

  // State
  const [product, setProduct] = useState({});

  useEffect(() => {
    // Function to get all products
    const getProducts = async () => {
      try {
        const response = await userService.allProducts();
        
        if(response.status === 200 || response.status ===201){
          setProduct(response.data);
        }
      } catch (err) {
        console.error(err);
      }
    }

    // Call the function
    getProducts();
  },[]);

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
