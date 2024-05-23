// import required packages
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import userService from "../../../Services/UserService";
import { useFormik } from "formik";
import { LuAlertCircle } from "react-icons/lu";

// formik validation
const validate = values => {

    // define errord oject
    const errors = {};

    // check if company name is empty or valid
    if (!values.companyName) {
        errors.companyName = 'Company name is required';
    } else if (values.companyName.length < 3) {
        errors.companyName = 'Company name must be at least 3 characters';
    }

    // check if owner name is empty or valid
    if (!values.ownerName) {
        errors.ownerName = 'Vendor name is required';
    } else if (values.ownerName.length < 3) {
        errors.ownerName = 'Vendor name must be at least 3 characters';
    }

    // check if email is empty or valid
    if (!values.email) {
        errors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    // check if gst no is empty or valid
    if (!values.gstNumber) {
        errors.gstNumber = 'GST no is required';
    } else if (values.gstNumber.length !== 15) {
        errors.gstNumber = 'GST no must be 15 characters';
    }

    // check if phone no is empty or valid
    if (!values.phoneNo) {
        errors.phoneNo = 'Phone no is required';
    } else if (values.phoneNo.length < 10 && values.phoneNo.length > 10) {
        errors.phoneNo = 'Phone no must be 10 characters';
    }

    // check if street is empty or valid
    if (!values.street) {
        errors.street = 'Street is required';
    } else if (values.street.length < 3) {
        errors.street = 'Street must be at least 3 characters';
    }

    // check if city is empty or valid
    if (!values.city) {
        errors.city = 'City is required';
    } else if (values.city.length < 3) {
        errors.city = 'City must be at least 3 characters';
    }

    // check if state is empty or valid
    if (!values.state) {
        errors.state = 'State is required';
    } else if (values.state.length < 3) {
        errors.state = 'State must be at least 3 characters';
    }

    // check if country is empty or valid
    if (!values.country) {
        errors.country = 'Country is required';
    } else if (values.country.length < 3) {
        errors.country = 'Country must be at least 3 characters';
    }

    // check if pincode is empty or valid
    if (!values.pincode) {
        errors.pincode = 'Pincode is required';
    } else if (values.pincode.length < 3) {
        errors.pincode = 'Pincode must be at least 3 characters';
    }

    // return errors object
    return errors;
};

const VendorEditForm = () => {

    // State variables
    const [vendorInfo, setVendorInfo] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    // define params
    const { id } = useParams();

    // define useNavigate
    const navigate = useNavigate();

    // get vendor data
    useEffect(() => {

        // Function to get vendor from API
        const findVendor = async () => {
            try {

                // Call API
                const response = await userService.getVendor(id);

                // update state
                setVendorInfo(response.data);
                setIsLoading(false);

            } catch (error) {
                setIsLoading(false);
                console.log(error);
            }
        };

        findVendor();
    }, [id]);

    // useFormik hook
    const formik = useFormik({
        initialValues: {
            companyName: vendorInfo.companyName || '',
            ownerName: vendorInfo.ownerName || ' ',
            email: vendorInfo.email || '',
            gstNumber: vendorInfo.gstNumber || '',
            phoneNo: vendorInfo.phoneNo || '',
            street: vendorInfo.address?.street || '',
            city: vendorInfo.address?.city || '',
            state: vendorInfo.address?.state || '',
            country: vendorInfo.address?.country || '',
            pincode: vendorInfo.address?.pincode || ''
        },
        enableReinitialize: true,
        validate,
        onSubmit: async (values) => {

            // update value object
            const updateValues = {
                companyName: values.companyName,
                ownerName: values.ownerName,
                email: values.email,
                gstNumber: values.gstNumber,
                phoneNo: values.phoneNo,
                address: {
                    street: values.street,
                    city: values.city,
                    state: values.state,
                    country: values.country,
                    pincode: values.pincode
                }
            };
            try {

                // api to update vendor details
                const response = await userService.updateVendor(id, updateValues);

                // check if response is successfull
                if (response.status === 200 || response.status === 201) {
                    navigate('/vendor/all');
                    formik.resetForm();
                    alert("Vendor updated successfully");
                }

            } catch (err) {
                console.log(err);
            }
        }
    });

    return (
        <>
            {isLoading ? (
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
                                <h1 className='text-center'>Edit Vendor</h1>

                                <div className="row">

                                    <div className="col-lg-6 col-md-12">
                                        <div className='my-3'>
                                            <label htmlFor="companyName" className="form-label fw-bold">Company Name</label>
                                            <input
                                                type="text"
                                                placeholder='Enter Company Name'
                                                id='companyName'
                                                name='companyName'
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.companyName}
                                            />
                                        </div>
                                        {formik.touched.companyName && formik.errors.companyName ? (
                                            <><LuAlertCircle className='text-danger me-2' /><small className="text-danger">{formik.errors.companyName}</small></>
                                        ) : null}
                                    </div>

                                    <div className="col-lg-6 col-md-12">
                                        <div className='my-3'>
                                            <label htmlFor="ownerName" className="form-label fw-bold">Vendor Name</label>
                                            <input
                                                type="text"
                                                placeholder='Enter Vendor Name'
                                                id='ownerName'
                                                name='ownerName'
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.ownerName}
                                            />
                                        </div>
                                        {formik.touched.ownerName && formik.errors.ownerName ? (
                                            <><LuAlertCircle className='text-danger me-2' /><small className="text-danger">{formik.errors.ownerName}</small></>
                                        ) : null}
                                    </div>

                                    <div className="col-lg-6 col-md-12">
                                        <div className='my-3'>
                                            <label htmlFor="email" className="form-label fw-bold">Email</label>
                                            <input
                                                type="email"
                                                placeholder='Enter Email'
                                                id='email'
                                                name='email'
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.email}
                                            />
                                        </div>
                                        {formik.touched.email && formik.errors.email ? (
                                            <><LuAlertCircle className='text-danger me-2' /><small className="text-danger">{formik.errors.email}</small></>
                                        ) : null}
                                    </div>

                                    <div className="col-lg-6 col-md-12">
                                        <div className='my-3'>
                                            <label htmlFor="gstNumber" className="form-label fw-bold">gstNumber</label>
                                            <input
                                                type="text"
                                                placeholder='Enter GST NO'
                                                id='gstNumber'
                                                name='gstNumber'
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.gstNumber}
                                            />
                                        </div>
                                        {formik.touched.gstNumber && formik.errors.gstNumber ? (
                                            <><LuAlertCircle className='text-danger me-2' /><small className="text-danger">{formik.errors.gstNumber}</small></>
                                        ) : null}
                                    </div>

                                    <div className="col-lg-6 col-md-12">
                                        <div className='my-3'>
                                            <label htmlFor="phoneNo" className="form-label fw-bold">Phone No</label>
                                            <input
                                                type="tel"
                                                placeholder='Enter phoneNo'
                                                id='phoneNo'
                                                name='phoneNo'
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.phoneNo}
                                            />
                                        </div>
                                        <div className="col-lg-6 col-md-12">
                                            {formik.touched.phoneNo && formik.errors.phoneNo ? (
                                                <><LuAlertCircle className='text-danger me-2' /><small className="text-danger">{formik.errors.phoneNo}</small></>
                                            ) : null}
                                        </div>
                                    </div>

                                    <div className="col-lg-6 col-md-12">
                                        <div className='my-3'>
                                            <label htmlFor="street" className="form-label fw-bold">Street</label>
                                            <input
                                                type="text"
                                                placeholder='Enter street'
                                                id='street'
                                                name='street'
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.street}
                                            />
                                        </div>
                                        {formik.touched.street && formik.errors.street ? (
                                            <><LuAlertCircle className='text-danger me-2' /><small className="text-danger">{formik.errors.street}</small></>
                                        ) : null}
                                    </div>

                                    <div className="col-lg-6 col-md-12">
                                        <div className='my-3'>
                                            <label htmlFor="city" className="form-label fw-bold">City</label>
                                            <input
                                                type="text"
                                                placeholder='Enter city'
                                                id='city'
                                                name='city'
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.city}
                                            />
                                        </div>
                                        {formik.touched.city && formik.errors.city ? (
                                            <><LuAlertCircle className='text-danger me-2' /><small className="text-danger">{formik.errors.city}</small></>
                                        ) : null}
                                    </div>

                                    <div className="col-lg-6 col-md-12">
                                        <div className='my-3'>
                                            <label htmlFor="state" className="form-label fw-bold">State</label>
                                            <input
                                                type="text"
                                                placeholder='Enter state'
                                                id='state'
                                                name='state'
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.state}
                                            />
                                        </div>
                                        {formik.touched.state && formik.errors.state ? (
                                            <><LuAlertCircle className='text-danger me-2' /><small className="text-danger">{formik.errors.state}</small></>
                                        ) : null}
                                    </div>

                                    <div className="col-lg-6 col-md-12">
                                        <div className='my-3'>
                                            <label htmlFor="country" className="form-label fw-bold">Country</label>
                                            <input
                                                type="text"
                                                placeholder='Enter country'
                                                id='country'
                                                name='country'
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.country}
                                            />
                                        </div>
                                        {formik.touched.country && formik.errors.country ? (
                                            <><LuAlertCircle className='text-danger me-2' /><small className="text-danger">{formik.errors.country}</small></>
                                        ) : null}
                                    </div>

                                    <div className="col-lg-6 col-md-12">
                                        <div className='my-3'>
                                            <label htmlFor="pincode" className="form-label fw-bold">Pincode</label>
                                            <input
                                                type="text"
                                                placeholder='Enter Pincode'
                                                id='pincode'
                                                name='pincode'
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.pincode}
                                            />
                                        </div>
                                        {formik.touched.pincode && formik.errors.pincode ? (
                                            <><LuAlertCircle className='text-danger me-2' /><small className="text-danger">{formik.errors.pincode}</small></>
                                        ) : null}
                                    </div>

                                </div>

                                <div className='text-center'>
                                    <button type="submit" onClick={formik.handleSubmit} className='button'>Update</button>
                                    <Link to={"/vendor/all"}>
                                        <button className='editButton pt-2.5 ms-3'>Cancel</button>
                                    </Link>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default VendorEditForm;
