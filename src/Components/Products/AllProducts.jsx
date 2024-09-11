import { useEffect, useState } from "react";
import userService from "../../../Services/UserService";
import ProductCard from "./ProductCard";

const AllProducts = () => {
  // State to store all products
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get all products
  const getALLProducts = async () => {
    try {
      const response = await userService.allProducts();
      if (response.status === 200) {
        setProducts(response.data);
        setIsLoading(false);
      } else {
        throw new Error('Failed to fetch products');
      }
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
      console.log(error);
    }
  };

  // Handle delete to delete a product
  const handleDelete = async (id) => {
    try {
      const response = await userService.deleteProduct(id);
      if (response.status === 200 || response.status === 201) {
        alert("Product deleted successfully");
        getALLProducts();
      } else {
        throw new Error('Failed to delete product');
      }
    } catch (err) {
      console.log(err);
      alert("An error occurred while deleting the product");
    }
  };

  // useEffect to get all products
  useEffect(() => {
    getALLProducts();
  }, []);

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
      ) : error ? (
        <div className="container">
          <h1 className="text-center">Error: {error}</h1>
        </div>
      ) : (
        <>
          <h1 className='ps-5 ms-5 mt-3'>All Products</h1>
          <div className="container pt-0">
            <div className="row">
              {products.length ? (
                products.map((product) => (
                  <ProductCard key={product.id} product={product} handleDelete={handleDelete} />
                ))
              ) : (
                <h1 className="text-center">No Products Found</h1>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AllProducts;
