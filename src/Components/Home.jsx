// Import required packages
import { useEffect } from 'react';
import { useLoaderData } from "react-router-dom";
import userService from "../../Services/UserService";
import Dashboard from "./Dashboard";

// Loader Function to get all products
export const productLoader = async () => {
  try {
    const response = await userService.allProducts();
    return response.data;
  } catch (err) {
    console.error(err.message);
    return null;
  }
};

const Home = () => {
  // Define useLoaderData
  const product = useLoaderData();

  useEffect(() => {
    // Check if the page has been reloaded before
    const hasReloaded = localStorage.getItem('hasReloaded');

    if (!hasReloaded) {
      localStorage.setItem('hasReloaded', 'true');
      window.location.reload();
    }
  }, []);

  return (
    <>
      <Dashboard data={product} />
    </>
  );
}

export default Home;
