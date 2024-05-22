// import required packages
import { useEffect, useState } from "react"
import userService from "../../../Services/UserService";
import ProductCard from "./ProductCard";

const AllProducts = () => {

  // State to store all products
  const [products, setProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // handle delete to delete a product
  const handleDelete = async (id) => {
    try {

      // Api to delete product
      const response = await userService.deleteProduct(id);

      // check if response is success
      if (response.status === 200 || response.status === 201) {
        console.log(response.data);
        alert("Product deleted successfully");
      }

    } catch (err) {
      console.log(err);
    }
  };

  // useEffect to Get all products
  useEffect(() => {

    // get all products
    const getALLProducts = async () => {

      // call API function
      const response = await userService.allProducts();
      try {

        // to check the response
        if (response.status === 200) {
          setProducts(response.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
      };
    };

    // call the function
    getALLProducts();
  }, [handleDelete]);


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
            <h1 className='ps-5 ms-5 mt-3'>All Products</h1>
            <div className="container pt-0">
              <div className="row ">
                {
                  products.map((product, index) => {
                    return <ProductCard key={index} product={product} handleDelete={handleDelete} />
                  })
                }
              </div>
            </div>
          </>
        )
      }
    </>
  )
}

export default AllProducts