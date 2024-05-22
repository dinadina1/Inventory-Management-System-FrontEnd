// import required packages
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik'
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import userService from '../../../Services/UserService';
import { LuAlertCircle } from 'react-icons/lu';

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

    // return errors object
    return errors;
}

const ProductEditForm = () => {

    // State for Loading
    const [isLoading, setIsLoading] = useState(true);

    // State for product
    const [product, setProduct] = useState({});

    // define useParams
    const { id } = useParams();

    // define useNavigate
    const navigate = useNavigate();

    // useEffect to get product data
    useEffect(() => {

        // Function to get product from API
        const getProduct = async () => {

            // Call get api function
            const response = await userService.getParticularProduct(id);
            try {

                // Check if the response is successful
                if (response.status === 200 || response.status === 201) {
                    setIsLoading(false);
                    setProduct(response.data);
                }
            } catch (error) {
                console.log(error);
            };
        };

        // Call the getProduct function
        getProduct();
    }, [id]);

    // Formik form
    const formik = useFormik({

        // define initial values
        initialValues: {
            productName: product.productName || '',
            description: product.description || '',
            price: product.price || '',
            invoiceNo: product.invoiceNo || '',
        },
        enableReinitialize: true,
        validate,
        onSubmit: async (values) => {

            try {
                // api to update a product
                const response = await userService.updateProduct(id, values);

                // check if the response is successful
                if (response.status === 200 || response.status === 201) {
                    alert("Product updated successfully");
                    formik.resetForm();
                    console.log(response.data);
                    navigate("/product/all");
                }

            } catch (error) {
                console.log(error);
            };
        },
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
                                <h1 className='text-center'>Edit Product</h1>

                                <div className="row">

                                    <div className="col-lg-6 col-md-12">
                                        <div className='my-3'>
                                            <label htmlFor="productName" className="form-label d-none">Product Name</label>
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
                                            <label htmlFor="description" className="form-label d-none">Description</label>
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
                                            <label htmlFor="price" className="form-label d-none">Price</label>
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
                                            <label htmlFor="invoiceNo" className="form-label d-none">Invoice No</label>
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
                                </div>

                                <div className='text-center'>
                                    <button type="submit" onClick={formik.handleSubmit} className='button'>Update</button>
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

export default ProductEditForm