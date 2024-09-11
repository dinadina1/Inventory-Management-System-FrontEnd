// import required packages
import { useEffect, useState } from 'react'
import userService from '../../../Services/UserService';
import VendorCard from './VendorCard';

const AllVendors = () => {

  // State for storing the list of vendors
  const [vendors, setVendors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

      // Function to fetch the vendors
      const fetchVendors = async () => {

        // API Call
        const response = await userService.allVendors();
        try {
  
          // update states
          setIsLoading(false);
          setVendors(response.data);
  
        } catch (err) {
          console.log(err);
        };
      };  

  // Function to handle the deletion of a vendor
  const handleDelete = async (id) => {
    try {
      // Api to delete the vendor
      await userService.deleteVendor(id);
      alert("Vendor deleted successfully");
      fetchVendors();
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch the list of vendors from the API
  useEffect(() => {
    // Call the function
    fetchVendors();
  }, []);


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
          <main>
            <h1 className='ps-5 ms-5 mt-3'>All Vendors</h1>
            <div className="container pt-0">
              <div className="row ">
                {
                  vendors.map((data, index) => {
                    if (!data.isDeleted)
                      return <VendorCard data={data} key={index} id={data._id} handleDelete={handleDelete} />
                  })
                }
              </div>
            </div>
          </main>
        )
      }
    </>
  )
}

export default AllVendors