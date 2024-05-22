// import required packages
import { instance, protectedInstance } from "./instance";

// create userService object
const userService = {
  // signup
  signup: async (user) => {
    return await instance.post("/signup", user);
  },

  // login
  login: async (user) => {
    return await instance.post("/login", user);
  },

  // logout
  logout: async () => {
    return await instance.get("/logout");
  },

  // Forgot password
  forgotPassword: async (data) => {
    return await instance.post("/forgot-password", data);
  },

  // Reset Password
  resetPassword: async (data) => {
    return await instance.post(`/reset-password/${data.resetCode}`, data);
  },

  // Get current logged in user
  currentUser: async () => {
    return await protectedInstance.get("/profile");
  },

  // Get all products
  allProducts: async () => {
    return await protectedInstance.get("/product/all");
  },

  // Get all stocks
  allturnover: async () => {
    return await protectedInstance.get("/purchase/turnover");
  },

  // Get all vendors
  allVendors: async () => {
    return await protectedInstance.get("/vendor/all");
  },

  // Get particular vendor
  getVendor: async (id) => {
    return await protectedInstance.get(`/vendor/${id}`);
  },

  // Update particular vendor
  updateVendor: async (id, data) => {
    return await protectedInstance.post(`/vendor/update-vendor/${id}`, data, {
      new: true,
    });
  },

  // Delete a vendor
  deleteVendor: async (id) => {
    return await protectedInstance.get(`/vendor/delete/${id}`);
  },

  // Register new vendor
  registerVendor: async (data) => {
    return await protectedInstance.post("/vendor/register", data);
  },

  // Get all vendors statewise
  allVendorsStatewise: async (state) => {
    return await protectedInstance.get(`/vendor/state/${state}`);
  },

  // Get all vendors citywise
  allVendorsCitywise: async (city) => {
    return await protectedInstance.get(`/vendor/city/${city}`);
  },

  // Get all products
  allProducts: async () => {
    return await protectedInstance.get("/product/all");
  },

  // Get particular product
  getParticularProduct: async (id) => {
    return await protectedInstance.get(`/product/${id}`);
  },

  // Update a product
  updateProduct: async (id, data) => {
    return await protectedInstance.put(`/product/update/${id}`, data, {
      new: true,
    });
  },

  // delete a product
  deleteProduct: async (id) => {
    return await protectedInstance.delete(`/product/${id}`);
  },

  // Register new product
  registerProduct: async (data) => {
    return await protectedInstance.post("/product/register", data);
  },

  // get all purchase orders
  allPurchaseOrders: async () => {
    return await protectedInstance.get("/purchase/all");
  },

  // Register purchase order
  registerPurchase: async (data) => {
    return await protectedInstance.post("/purchase/register", data);
  },

  // Get purchase order by id
  getPurchaseById: async (id) => {
    return await protectedInstance.get(`/purchase/${id}`);
  },

  // update a purchase order by id
  updatePurchase: async (id, data) => {
    return await protectedInstance.post(`/purchase/update/${id}`, data);
  },

  // Delete a purchase order
  deletePurchase: async (id) => {
    return await protectedInstance.delete(`/purchase/${id}`);
  },

  // All purchase datewise
  allPurchaseDatewise: async (date) => {
    return await protectedInstance.get(`/purchase/order/${date}`);
  },

  // Get all stocks
  allStocks: async () => {
    return await protectedInstance.get("/purchase/all-stocks");
  },

  // Register new user
  registerUser: async (data) => {
    return await protectedInstance.post("/createuser", data);
  },

  // Get all users
  allUsers: async () => {
    return await protectedInstance.get("/allusers");
  },

  // Get particular user
  getUser: async (id) => {
    return await protectedInstance.get(`/${id}`);
  },

  // Update a user
  updateUser: async (id, data) => {
    return await protectedInstance.put(`/${id}`, data);
  },

  // delete a user
  deleteUser: async (id) => {
    return await protectedInstance.delete(`/${id}`);
  },
};

// export userService object
export default userService;
