// import required packages
import { RouterProvider } from 'react-router-dom';
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import { createBrowserRouter } from "react-router-dom";
import ForgotPassword from "./Components/ForgotPassword";
import ResetPassword from "./Components/ResetPassword";
import Home from './Components/Home';
import "./App.css";
import UserProfile from './Components/Users/UserProfile';
import { productLoader } from './Components/Home';
import RegisterProduct from './Components/Products/RegisterProduct';
import AllProducts from './Components/Products/AllProducts';
import RegisterVendor from './Components/Vendors/RegisterVendor';
import AllVendors from './Components/Vendors/AllVendors';
import VendorStatewise from './Components/Vendors/VendorStatewise';
import VendorCitywise from './Components/Vendors/VendorCitywise';
import RegisterPurchase from './Components/Purchases/RegisterPurchase';
import AllPurchaseOrder from './Components/Purchases/AllPurchaseOrder';
import AllPurchaseDatewise from './Components/Purchases/AllPurchaseDatewise';
import AllStocks from './Components/Purchases/AllStocks';
import StockLevelReport from './Components/Reports/StockLevelReport';
import PurchseOrderReport from './Components/Reports/PurchseOrderReport';
import TurnOverReport from './Components/Reports/TurnOverReport';
import VendorDet from './Components/Vendors/VendorDet';
import VendorEditForm from './Components/Vendors/VendorEditForm';
import ProductDet from './Components/Products/ProductDet';
import ProductEditForm from './Components/Products/ProductEditForm';
import PurchaseEditForm from './Components/Purchases/PurchaseEditForm';
import PurchaseDet from './Components/Purchases/PurchaseDet';
import Navbar from './Components/Navbar';
import CreateUser from './Components/Users/CreateUser';
import AllUser from './Components/Users/AllUser';
import EditUserForm from './Components/Users/EditUserForm';

const App = () => {

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/forgot-password",
      element: <ForgotPassword />,
    },
    {
      path: "/reset-password/:resetCode",
      element: <ResetPassword />
    },
    {
      path: "/",
      element: <Navbar />,
      children: [
        {
          path: "/",
          loader: productLoader,
          element: <Home />
        },
        {
          path: "/user/profile",
          element: <UserProfile />
        },
        {
          path: "/create-user",
          element: <CreateUser />
        },
        {
          path: "/user/all",
          element: <AllUser />
        },
        {
          path: "/user/edit/:id",
          element: <EditUserForm />
        },
        {
          path: "/product/register-product",
          element: <RegisterProduct />
        },
        {
          path: "/product/all",
          element: <AllProducts />
        },
        {
          path: "/product/:id",
          element: <ProductDet />
        },
        {
          path: "/product/edit/:id",
          element: <ProductEditForm />
        },
        {
          path: "/vendor/register",
          element: <RegisterVendor />
        },
        {
          path: "/vendor/all",
          element: <AllVendors />
        },
        {
          path: "/vendor/edit/:id",
          element: <VendorEditForm />
        },
        {
          path: "/vendor/statewise-all",
          element: <VendorStatewise />
        },
        {
          path: "/vendor/citywise-all",
          element: <VendorCitywise />
        },
        {
          path: "/vendor/:id",
          element: <VendorDet />
        },
        {
          path: "/purchase/register",
          element: <RegisterPurchase />
        },
        {
          path: "/purchase/all",
          element: <AllPurchaseOrder />
        },
        {
          path: "/purchase/datewise-all",
          element: <AllPurchaseDatewise />
        },
        {
          path: "/purchase/stocks",
          element: <AllStocks />
        },
        {
          path: "/purchase/edit/:id",
          element: <PurchaseEditForm />
        },
        {
          path: "/purchase/:id",
          element: <PurchaseDet />
        },
        {
          path: "/report/stocklevel",
          element: <StockLevelReport />
        },
        {
          path: "/report/purchase-order",
          element: <PurchseOrderReport />
        },
        {
          path: "/report/turnover",
          element: <TurnOverReport />
        }
      ]
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
