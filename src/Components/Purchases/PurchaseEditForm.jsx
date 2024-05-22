// import required packages
import React, { useEffect, useState } from 'react'
import userService from '../../../Services/UserService';
import { useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { LuAlertCircle } from 'react-icons/lu';
import { Link } from 'react-router-dom';

// validate form
const validate = (values) => {

    // errors object
    const errors = {};

    // Validate purchase order no
    if (!values.purchaseOrderNo) {
        errors.purchaseOrderNo = 'Required';
    }

    // Validate product item
    if (!values.productItem) {
        errors.productItem = 'Required';
    } else if (values.productItem.length < 3) {
        errors.productItem = 'Must be 3 characters or more';
    }

    // Validate description
    if (!values.description) {
        errors.description = 'Required';
    } else if (values.description.length < 3) {
        errors.description = 'Must be 3 characters or more';
    }

    // Validate quantity
    if (!values.quantity) {
        errors.quantity = 'Required';
    } else if (values.quantity < 0) {
        errors.quantity = 'Must be greater than 0';
    }

    // Validate unit price
    if (!values.unitPrice) {
        errors.unitPrice = 'Required';
    } else if (values.unitPrice < 0) {
        errors.unitPrice = 'Must be greater than 0';
    }

    // Validate order date
    if (!values.orderDate) {
        errors.orderDate = 'Required';
    }

    // Validate gst percentage
    if (!values.gstPercentage) {
        errors.gstPercentage = 'Required';
    } else if (values.gstPercentage < 0) {
        errors.gstPercentage = 'Must be greater than 0';
    }

    // Validate invoice no
    if (!values.invoiceNo) {
        errors.invoiceNo = 'Required';
    } else if (values.invoiceNo.length < 3) {
        errors.invoiceNo = 'Must be 3 characters or more';
    }

    // Validate vendor
    if (!values.vendor) {
        errors.vendor = 'Required';
    }

    // Validate location
    if (!values.location) {
        errors.location = 'Required';
    } else if (values.location.length < 3) {
        errors.location = 'Must be 3 characters or more';
    }

    // return errors object
    return errors;
}

const PurchaseEditForm = () => {

    // State for vendor list
    const [vendorList, setVendorList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [purchase, setPurchase] = useState({});

    // define params
    const { id } = useParams();

    //  define navigate
    const navigate = useNavigate();

    // Get vendor list 
    useEffect(() => {

        // Api to get vendor list
        const getVendorList = async () => {
            try {

                // Api to get vendor list
                const response = await userService.allVendors();

                // Check if the response is successful
                if (response.status === 200 || response.status === 201) {

                    // update the vendor list state
                    setVendorList(response.data);
                    // setIsLoading(false);
                    console.log(vendorList);
                }
            } catch (error) {
                console.log(error);
            }
        };

        // Call the getVendorList function
        getVendorList();
    }, []);

    // useEffect to get a purchase order
    useEffect(() => {

        // Function to get a purchase order from the API
        const getPurchaseOrder = async () => {
            try {

                // API call
                const response = await userService.getPurchaseById(id);
                setPurchase(response.data);
                setIsLoading(false);

            } catch (err) {
                alert(err.response.message);
                console.log(err);
            }
        }

        // call the function
        getPurchaseOrder();
    }, []);

    // Formik form
    const formik = useFormik({
        initialValues: {
            purchaseOrderNo: purchase.purchaseOrderNo || '',
            productItem: purchase.productItem || '',
            description: purchase.description || '',
            quantity: purchase.quantity || '',
            unitPrice: purchase.unitPrice || '',
            orderDate: purchase.orderDate || '',
            gstPercentage: purchase.gstPercentage || '',
            invoiceNo: purchase.invoiceNo || '',
            vendor: purchase.vendor || '',
            location: purchase.location || ''

        },
        enableReinitialize: true,
        validate,
        onSubmit: async (values) => {
            try {
                console.log(values);
                // Api to update purchase
                const response = await userService.updatePurchase(id, values);

                // // check if response is success
                if (response.status === 201 || response.status === 200) {
                    alert("Purchase updated Successfully");
                    formik.resetForm();
                    navigate("/purchase/all");
                    console.log(response.data);
                }

            } catch (err) {
                console.log(err);
                alert(err.response.data.message);
            }
        },
    });

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
                    <div className="container">
                        <div className="row signup-container">
                            <div className="col-lg-12">
                                <form className='forms' onSubmit={formik.handleSubmit}>
                                    <h1 className='text-center'>Register Purchase Order</h1>

                                    <div className="row">

                                        <div className="col-lg-6 col-sm-12">

                                            <div className='my-3'>
                                                <label htmlFor="purchaseOrderNo" className="form-label fw-bold">Purchase Order No:</label>
                                                <input
                                                    type="text"
                                                    placeholder='Enter Purchase Order No'
                                                    id="purchaseOrderNo"
                                                    name='purchaseOrderNo'
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.purchaseOrderNo}
                                                />

                                                {/* display message if purchase order no is invalid */}
                                                {
                                                    formik.touched.purchaseOrderNo && formik.errors.purchaseOrderNo ? (
                                                        <><LuAlertCircle className='text-danger me-2' /><small className="text-danger">{formik.errors.purchaseOrderNo}</small></>
                                                    ) : null
                                                }
                                            </div>
                                        </div>

                                        <div className="col-lg-6 col-sm-12">
                                            <div className='my-3'>
                                                <label htmlFor="productItem" className="form-label fw-bold">Product Item:</label>
                                                <input
                                                    type="text"
                                                    placeholder='Enter Product Item'
                                                    id='productItem'
                                                    name='productItem'
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.productItem}
                                                />

                                                {/* display message if product item is invalid */}
                                                {
                                                    formik.touched.productItem && formik.errors.productItem ? (
                                                        <><LuAlertCircle className='text-danger me-2' /><small className="text-danger">{formik.errors.productItem}</small></>
                                                    ) : null
                                                }
                                            </div>
                                        </div>

                                        <div className="col-lg-6 col-sm-12">
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

                                                {/* display message if description is invalid */}
                                                {
                                                    formik.touched.description && formik.errors.description ? (
                                                        <><LuAlertCircle className='text-danger me-2' /><small className="text-danger">{formik.errors.description}</small></>
                                                    ) : null
                                                }
                                            </div>
                                        </div>

                                        <div className="col-lg-6 col-sm-12">
                                            <div className='my-3'>
                                                <label htmlFor="vendor" className="form-label fw-bold">Vendor:</label>
                                                <select name="vendor" className='' id="vendor" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.vendor}>
                                                    <option value="">Select Vendor</option>
                                                    {vendorList.map((vendor) => (
                                                        <option key={vendor._id} value={vendor._id}>{vendor.companyName}</option>
                                                    ))}
                                                </select>

                                                {/* display message if vendor is invalid */}
                                                {
                                                    formik.touched.vendor && formik.errors.vendor ? (
                                                        <><LuAlertCircle className='text-danger me-2' /><small className="text-danger">{formik.errors.vendor}</small></>
                                                    ) : null
                                                }
                                            </div>
                                        </div>

                                        <div className="col-lg-6 col-sm-12">
                                            <div className='my-3'>
                                                <label htmlFor="quantity" className="form-label fw-bold">Quantity:</label>
                                                <input
                                                    type="number"
                                                    placeholder='Enter Quantity'
                                                    id='quantity'
                                                    name='quantity'
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.quantity}
                                                />

                                                {/* display message if quantity is invalid */}
                                                {
                                                    formik.touched.quantity && formik.errors.quantity ? (
                                                        <><LuAlertCircle className='text-danger me-2' /><small className="text-danger">{formik.errors.quantity}</small></>
                                                    ) : null
                                                }
                                            </div>
                                        </div>

                                        <div className="col-lg-6 col-sm-12">
                                            <div className='my-3'>
                                                <label htmlFor="unitPrice" className="form-label fw-bold">Unit Price:</label>
                                                <input
                                                    type="number"
                                                    placeholder='Enter Unit Price'
                                                    id='unitPrice'
                                                    name='unitPrice'
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.unitPrice}
                                                />

                                                {/* display message if unit price is invalid */}
                                                {
                                                    formik.touched.unitPrice && formik.errors.unitPrice ? (
                                                        <><LuAlertCircle className='text-danger me-2' /><small className="text-danger">{formik.errors.unitPrice}</small></>
                                                    ) : null
                                                }
                                            </div>
                                        </div>

                                        <div className="col-lg-6 col-sm-12">
                                            <div className='my-3'>
                                                <label htmlFor="orderDate" className="form-label fw-bold">Order Date:</label>
                                                <input
                                                    type="date"
                                                    placeholder='Enter Order Date'
                                                    id='orderDate'
                                                    name='orderDate'
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.orderDate}
                                                />

                                                {/* display message if order date is invalid */}
                                                {
                                                    formik.touched.orderDate && formik.errors.orderDate ? (
                                                        <><LuAlertCircle className='text-danger me-2' /><small className="text-danger">{formik.errors.orderDate}</small></>
                                                    ) : null
                                                }
                                            </div>
                                        </div>

                                        <div className="col-lg-6 col-sm-12">
                                            <div className='my-3'>
                                                <label htmlFor="gstPercentage" className="form-label fw-bold">GST Percentage:</label>
                                                <input
                                                    type="number"
                                                    placeholder='Enter GST Percentage'
                                                    id='gstPercentage'
                                                    name='gstPercentage'
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.gstPercentage}
                                                />

                                                {/* display message if gst percentage is invalid */}
                                                {
                                                    formik.touched.gstPercentage && formik.errors.gstPercentage ? (
                                                        <><LuAlertCircle className='text-danger me-2' /><small className="text-danger">{formik.errors.gstPercentage}</small></>
                                                    ) : null
                                                }
                                            </div>
                                        </div>

                                        <div className="col-lg-6 col-sm-12">
                                            <div className='my-3'>
                                                <label htmlFor="invoiceNo" className="form-label fw-bold">Invoice No:</label>
                                                <input
                                                    type="text"
                                                    placeholder='Enter Invoice No'
                                                    id='invoiceNo'
                                                    name='invoiceNo'
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.invoiceNo}
                                                />

                                                {/* display message if invoice no is invalid */}
                                                {
                                                    formik.touched.invoiceNo && formik.errors.invoiceNo ? (
                                                        <><LuAlertCircle className='text-danger me-2' /><small className="text-danger">{formik.errors.invoiceNo}</small></>
                                                    ) : null
                                                }
                                            </div>
                                        </div>

                                        <div className="col-lg-6 col-sm-12">
                                            <div className='my-3'>
                                                <label htmlFor="location" className="form-label fw-bold">Location:</label>
                                                <input
                                                    type="text"
                                                    placeholder='Enter Location'
                                                    id='location'
                                                    name='location'
                                                    onBlur={formik.handleBlur}
                                                    onChange={formik.handleChange}
                                                    value={formik.values.location}
                                                />

                                                {/* display message if location is invalid */}
                                                {
                                                    formik.touched.location && formik.errors.location ? (
                                                        <><LuAlertCircle className='text-danger me-2' /><small className="text-danger">{formik.errors.location}</small></>
                                                    ) : null
                                                }
                                            </div>
                                        </div>

                                    </div>

                                    <div className='text-center'>
                                        <button type="submit" onClick={formik.handleSubmit} className='button'>Update</button>
                                        <Link to={"/purchase/all"}>
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

export default PurchaseEditForm