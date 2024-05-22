// import context
import React, { createContext, useState } from "react";
import userService from "../Services/UserService";

// create AppContext
const AppContext = createContext({});

// Export LevelContext
export const LevelContext = ({ children }) => {

  // state for isLoading 
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const [navigation, setNavigation] = useState(null);
  const [isMailSent, setIsMailSent] = useState(false);
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const [vendorList, setVendorList] = useState([]);
  const [purchaseList, setPurchaseList] = useState([]);

  // function to signup new user
  const signUp = async (data) => {
    try {
      // set isLoading to true
      setIsLoading(true);
      setIsError("");

      // api call to register user
      const response = await userService.signup(data);

      // check if response is success
      if (response.status === 201 || response.status === 200) {
        setIsLoading(false);
        // notifyToast("Registration Successful");
        setNavigation("/login");
      }
    } catch (err) {
      console.log(err);
      setIsError(err.response.data.message);
      setIsLoading(false);
    }
  };


  // Function to forgot password
  const forgotPassword = async (data) => {
    try {

      // set isLoading to true
      setIsLoading(true);
      setIsError("");

      // api call to register user
      const response = await userService.forgotPassword(data);

      // check if response is success
      if (response.status === 200 || response.status === 201) {
        setIsLoading(false);
        setIsMailSent(true);
      }

    } catch (err) {
      console.log(err);
      setIsError(err.response.data.message);
      setIsLoading(false);
    }
  };

  // Function to reset password
  const resetPassword = async (data) => {
    try {
      // set isLoading to true
      setIsLoading(true);
      setIsError("");

      // api call to register user
      const response = await userService.resetPassword(data);

      // check if response is success
      if (response.status === 200 || response.status === 201) {
        setIsLoading(false);
        setIsPasswordReset(true);
        setNavigation("/login");
      }

    } catch (err) {
      console.log(err);
      setIsError(err.response.data.message);
      setIsLoading(false);
    }
  };



  return (
    <AppContext.Provider value={{
      signUp, isLoading, isError, navigation, setNavigation, forgotPassword, isMailSent,
      setIsMailSent, isPasswordReset, setIsPasswordReset, resetPassword, vendorList, setVendorList,
      purchaseList, setPurchaseList
    }}>
      {children}
    </AppContext.Provider>
  );
};

// export AppContext
export default AppContext;
