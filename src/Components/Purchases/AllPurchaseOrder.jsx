// import required packages
import { useEffect, useState } from "react"
import userService from '../../../Services/UserService';
import PurchaseCard from "./PurchaseCard";

const AllPurchaseOrder = () => {

  // State for purchaseList
  const [purchaseList, setPurchaseList] = useState([]);

  // State for isLoading
  const [isLoading, setIsLoading] = useState(true);

  // Function to delete a purchase order
  const handleDelete = async (id) => {
    try {

      // API to delete purchase order
      const response = await userService.deletePurchase(id);

      // Check if the response is successful
      if (response.status === 200 || response.status === 201) {
        alert("Purchase order deleted successfully");
      }

    } catch (err) {
      console.log(err);
    }
  }

  //  useEffect to fetch purchaseList
  useEffect(() => {

    // Fetch purchaseList from API
    const fetchPurchaseList = async () => {
      try {

        // Get data from API
        const response = await userService.allPurchaseOrders();

        // Set purchaseList state
        setPurchaseList(response.data);
        setIsLoading(false);

      } catch (error) {
        console.error(error);
      }
    };

    // call the API
    fetchPurchaseList();
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
            <h1 className='ps-5 ms-5 mt-3'>All Purchase Orders</h1>
            <div className="container pt-0">
              <div className="row ">
                {
                  purchaseList.map((purchase, index) => {
                    return <PurchaseCard key={index} purchase={purchase} handleDelete={handleDelete} />
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

export default AllPurchaseOrder