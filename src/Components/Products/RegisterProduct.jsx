// import required packages
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import React, { useContext } from 'react'
import AppContext from '../../../Context/LevelContext'
import userService from '../../../Services/UserService'
import { useFormik } from 'formik'
import { Link } from 'react-router-dom'
import { LuAlertCircle } from 'react-icons/lu'

// Formik validate
const validate = (values) => {

  // define errors oject
  const errors = {};

  // validate product name
  if (!values.productName) {
    errors.productName = 'Product Name Required';
  } else if (values.productName.length < 3) {
    errors.productName = 'Product Name must be atleast 3 characters';
  }

  // validate description
  if (!values.description) {
    errors.description = 'Description Required';
  } else if (values.description.length < 3) {
    errors.description = 'Description must be atleast 3 characters';
  }

  // validate price
  if (!values.price) {
    errors.price = 'Price Required';
  } else if (values.price < 0) {
    errors.price = 'Price must be greater than 0';
  }

  // validate invoice no
  if (!values.invoiceNo) {
    errors.invoiceNo = 'Invoice No Required';
  } else if (values.invoiceNo.length < 3) {
    errors.invoiceNo = 'Invoice No must be atleast 3 characters';
  }

  // validate vendor
  if (!values.vendor) {
    errors.vendor = 'Vendor is Required';
  }

  // validate purchase order
  if (!values.purchaseOrder) {
    errors.purchaseOrder = 'purchaseOrder is Required';
  }

  // return errors object
  return errors;
}

const RegisterProduct = () => {

  // use state from context
  const { vendorList, setVendorList, purchaseList, setPurchaseList } = useContext(AppContext);

  // define useNavigate
  const navigate = useNavigate();

  // State for product
  // State for loading
  const [loading, setLoading] = useState(true);

  // Get vendor list 
  useEffect(() => {

    // Api to get vendor list
    const getVendorList = async () => {
      try {

        // Api to get vendor list
        const response = await userService.allVendors();

        // Check if the response is successful
        if (response.status === 200 || response.status === 201) {

          // update the vendor list state and setLoading state
          // setLoading(false);
          setVendorList(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    // Call the getVendorList function
    getVendorList();
  }, []);

  // Get puchase list 
  useEffect(() => {

    // Api to get puchase list
    const getPurchaseList = async () => {
      try {

        // Api to get puchase list
        const response = await userService.allPurchaseOrders();

        // Check if the response is successful
        if (response.status === 200 || response.status === 201) {

          // update the puchase list state and setLoading state
          setLoading(false);
          setPurchaseList(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    // Call the getPurchaseList function
    getPurchaseList();

  }, []);

  // Formik form
  const formik = useFormik({

    // define initial values
    initialValues: {
      productName: '',
      description: '',
      price: '',
      invoiceNo: '',
      vendor: '',
      purchaseOrder: ''
    },
    enableReinitialize: true,
    validate,
    onSubmit: async (values) => {

      try {
        // console.log(values);
        // api to create a product
        const response = await userService.registerProduct(values);

        // Check if the response is successful
        if (response.status === 200 || response.status === 201) {
          alert('Product Created Successfully');
          formik.resetForm();
          navigate("/product/all");

        }
      } catch (error) {
        console.log(error);
      }
    },
  });


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

          <div className="container">
            <div className="row signup-container">
              <div className="col-lg-12">
                <form className='forms' onSubmit={formik.handleSubmit}>
                  <h1 className='text-center'>Register Product</h1>

                  <div className="row">
                    <div className="col-lg-6 col-md-12">
                      <div className='my-3'>
                        <label htmlFor="productName" className="form-label fw-bold">Product Name:</label>
                        <input
                          type="text"
                          placeholder='Enter Product Name'
                          id='productName'
                          name='productName'
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.productName}
                        />
                      </div>

                      {/* display error message if product name is invalid */}
                      {formik.touched.productName && formik.errors.productName ? (
                        <><LuAlertCircle className='text-danger me-2' /><small className="text-danger">{formik.errors.productName}</small></>
                      ) : null}
                    </div>

                    <div className="col-lg-6 col-md-12">
                      <div className='my-3'>
                        <label htmlFor="description" className="form-label fw-bold">Description:</label>
                        <input
                          type="text"
                          placeholder='Enter Description'
                          id='description'
                          name='description'
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.description}
                        />
                      </div>

                      {/* display error message if description is invalid */}
                      {formik.touched.description && formik.errors.description ? (
                        <><LuAlertCircle className='text-danger me-2' /><small className="text-danger">{formik.errors.description}</small></>
                      ) : null}
                    </div>

                    <div className="col-lg-6 col-md-12">
                      <div className='my-3'>
                        <label htmlFor="price" className="form-label fw-bold">Price:</label>
                        <input
                          type="number"
                          placeholder='Enter Price'
                          name='price'
                          id='price'
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.price}
                          min={0}
                        />
                      </div>

                      {/* display error message if price is invalid */}
                      {formik.touched.price && formik.errors.price ? (
                        <><LuAlertCircle className='text-danger me-2' /><small className="text-danger">{formik.errors.price}</small></>
                      ) : null}
                    </div>

                    <div className="col-lg-6 col-md-12">
                      <div className='my-3'>
                        <label htmlFor="invoiceNo" className="form-label fw-bold">Invoice No:</label>
                        <input
                          type="text"
                          placeholder='Enter Invoice No'
                          name='invoiceNo'
                          id='invoiceNo'
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.invoiceNo}
                        />
                      </div>

                      {/* display error message if invoice no is invalid */}
                      {formik.touched.invoiceNo && formik.errors.invoiceNo ? (
                        <><LuAlertCircle className='text-danger me-2' /><small className="text-danger">{formik.errors.invoiceNo}</small></>
                      ) : null}
                    </div>

                    <div className="col-lg-6 col-md-12">
                      <div className='my-3'>
                        <label htmlFor="vendor" className="form-label fw-bold">Vendor:</label>
                        <select name="vendor" className='' id="vendor" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.vendor}>
                          <option value="">Select Vendor</option>
                          {vendorList.map((vendor) => (
                            <option key={vendor._id} value={vendor._id}>{vendor.companyName}</option>
                          ))}
                        </select>
                      </div>

                      {/* display message if vendor is invalid */}
                      {
                        formik.touched.vendor && formik.errors.vendor ? (
                          <><LuAlertCircle className='text-danger me-2' /><small className="text-danger">{formik.errors.vendor}</small></>
                        ) : null
                      }
                    </div>

                    <div className="col-lg-6 col-md-12">
                      <div className='my-3'>
                        <label htmlFor="purchaseOrder" className="form-label fw-bold">Purchase Order:</label>
                        <select name="purchaseOrder" className='' id="purchaseOrder" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.purchaseOrder}>
                          <option value="">Select Purchase Order</option>
                          {purchaseList.map((purchase) => (
                            <option key={purchase._id} value={purchase._id}>{purchase.purchaseOrderNo}</option>
                          ))}
                        </select>
                      </div>

                      {/* display message if purchase order is invalid */}
                      {
                        formik.touched.purchaseOrder && formik.errors.purchaseOrder ? (
                          <><LuAlertCircle className='text-danger me-2' /><small className="text-danger">{formik.errors.purchaseOrder}</small></>
                        ) : null
                      }
                    </div>
                  </div>

                  <div className='text-center mt-3'>
                    <button type="submit" onClick={formik.handleSubmit} className='button'>Register</button>
                    <Link to={"/product/all"}>
                      <button className='editButton pt-2.5 ms-3'>Cancel</button>
                    </Link>
                  </div>

                </form>
              </div>
            </div>
          </div>

        )
      }
    </>
  )
}

export default RegisterProduct