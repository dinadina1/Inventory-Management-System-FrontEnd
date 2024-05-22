// import required packages
import { useEffect, useState } from 'react'
import userService from '../../../Services/UserService';
import StockTableRow from './StockTableRow';

const AllStocks = () => {

  // State for stock list
  const [stockList, setStockList] = useState([]);

  // State for isLoading
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);

  // useEffect to fetch stock list
  useEffect(() => {

    // Function to fetch stock list
    const fetchStockList = async () => {
      try {

        // Call API to get stock list
        const response = await userService.allStocks();

        // update states
        setStockList(response.data);
        setIsLoading(false);

      } catch (error) {
        // update states
        setIsError(error);
        setIsLoading(false);
        console.error(error);
      }
    };

    // call fetchStockList function
    fetchStockList();
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

          <>

            {
              isError ? (
                <div className="container" style={{ height: "90vh" }}>
                  <div className="d-flex justify-content-center">
                    <h1>Something went wrong</h1>
                  </div>
                </div>
              ) : (
                <>
                  {stockList.length > 0 ? (
                    <div className="container">
                      <div className="row">
                        <div className="col-12">
                          <h1 className="text-start ps-3 pt-4 ">All Stocks</h1>
                          <div className="grey-bg container pt-0">
                            <section className="minimal-statistics">
                              <div className="row">
                                <div className="col-12">
                                  <div className="table-responsive">
                                    <table className="table table-striped">
                                      <thead>
                                        <tr>
                                          <th scope="col">S.No</th>
                                          <th scope="col">Product</th>
                                          <th scope="col">Quantity</th>
                                          <th scope="col">Unit Price</th>
                                          <th scope="col">Total Price</th>
                                          <th scope="col">Location</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {
                                          stockList.map((stock, index) => {
                                            return <StockTableRow key={index} stock={stock} SNO={index + 1} />
                                          })
                                        }
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </section>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="container" style={{ height: "90vh" }}>
                      <div className="d-flex justify-content-center">
                        <h1 className="text-center">No Stocks Found</h1>
                      </div>
                    </div>
                  )}
                </>
              )
            }
          </>
        )
      }
    </>
  )
}

export default AllStocks