// import required packages
import { useEffect, useState } from 'react';
import userService from '../../Services/UserService';
import DashboardCard from "./DashboardCard";
import { AiFillProfile } from "react-icons/ai";
import { IoPricetags } from "react-icons/io5";
import { HiBuildingStorefront } from "react-icons/hi2";
import { FaRankingStar } from "react-icons/fa6";
import Footer from './Footer';

const Dashboard = () => {

  // Initialize state for stocks with a default structure to avoid undefined errors
  const [stocks, setStocks] = useState({});

  // state for loading
  const [loading, setLoading] = useState(true);

  // useEffect to get stocks
  useEffect(() => {
    const getStocks = async () => {
      try {
        const response = await userService.allturnover();
        setLoading(false);
        setStocks(response.data);
      } catch (err) {
        // alert(err.response.data.message);
        setLoading(false);
        console.log(err.response);
      }
    }
    getStocks();
  }, []);

  // useEffect(() => {
  //   // Check if the page has been reloaded before
  //   const hasReloaded = localStorage.getItem('hasReloaded');

  //   if (!hasReloaded) {

  //     localStorage.setItem('hasReloaded', 'true');
  //     window.location.reload();

  //   }
  // }, []);

  useEffect(() => {
    // Check the reload flag
    const reload = localStorage.getItem('reload');
    if (reload) {
      localStorage.removeItem('reload');
      return window.location.reload();
    }
  }, []);



  return (
    <>
      {
        loading ? (
          <div className="container" style={{ height: "90vh" }}>
            <div className="d-flex justify-content-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        ) : (
          <>
            <main>
              <h1 className="text-start ps-5 pt-4 ms-4">Dashboard</h1>
              <div className="grey-bg container pt-0">
                <section className="minimal-statistics">
                  <div className="row">
                    <div className="col-12">
                    </div>
                    <DashboardCard icon={AiFillProfile} color="#2ce6a8" content="Total Purchase Qty" value={(stocks.tot_PurchaseQty || 0).toLocaleString()} />
                    <DashboardCard icon={IoPricetags} color="#2ce6a8" content="Total Purchase Price" value={(stocks.tot_PurchasedPrice || 0).toLocaleString()} />
                    <DashboardCard icon={AiFillProfile} color="#e61561" content="Total Stock Qty" value={(stocks.tot_StockQuantity || 0).toLocaleString()} />
                    <DashboardCard icon={IoPricetags} color="#e61561" content="Total Stock Price" value={(stocks.tot_StockPrice || 0).toLocaleString()} />
                    <DashboardCard icon={AiFillProfile} color="#67e1e6" content="Total Delivered Qty" value={(stocks.tot_DeliveredQuantity || 0).toLocaleString()} />
                    <DashboardCard icon={IoPricetags} color="#67e1e6" content="Total Delivered Price" value={(stocks.tot_DeliveredPrice || 0).toLocaleString()} />
                    <DashboardCard icon={HiBuildingStorefront} color="#f0d53e" content="Gst Rate" value={`${stocks.gstPercentage || 0}%`} />
                    <DashboardCard icon={IoPricetags} color="#f0d53e" content="Total GST Price" value={(stocks.tot_gstAmount || 0).toLocaleString()} />
                    <DashboardCard icon={FaRankingStar} color="#5bf5a0" content="Total Profit" value={(stocks.profit || 0).toLocaleString()} />
                  </div>
                </section>
              </div>
            </main>

            <footer>
              <Footer />
            </footer></>
        )
      }
    </>
  );
}

export default Dashboard;
