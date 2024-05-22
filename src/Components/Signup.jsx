import { useNavigate } from 'react-router-dom';
import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AppContext from '../../Context/LevelContext';
import { useFormik } from 'formik';
import { LuAlertCircle } from "react-icons/lu";

// formik validation
const validate = values => {

    // define errors object
    const errors = {};

    // check if firstname is empty or valid
    if (!values.firstname) {
        errors.firstname = 'Firstname is required';
    } else if (values.firstname.length < 3) {
        errors.firstname = 'Firstname must be at least 3 characters';
    }

    // check if lastname is empty or valid
    if (!values.lastname) {
        errors.lastname = 'Lastname is required';
    }

    // check if email is empty or valid
    if (!values.email) {
        errors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    // check password is empty or valid
    if (!values.password) {
        errors.password = 'Password is required';
    } else if (values.password.length < 6) {
        errors.password = 'Password must be at least 6 characters';
    }

    // check if phone no is empty or valid
    if (!values.phoneno) {
        errors.phoneno = 'Phone No is required';
    } else if (values.phoneno.length !== 10) {
        errors.phoneno = 'Phone No must be 10 characters';
    }

    // return errors object
    return errors;

}

const Signup = () => {

    // use useContext
    const { signUp, isLoading, isError, navigation, setNavigation } = useContext(AppContext);

    // define useNavigate
    const navigate = useNavigate();

    // check if navigation is not null then navigate to navigation
    useEffect(() => {
        if (navigation) {
            navigate(navigation);
            setNavigation(null);
        }
    }, [navigation]);

    // formik form
    const formik = useFormik({
        initialValues: {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            phoneno: ''
        }, validate,
        onSubmit: async (values) => {
            await signUp(values);
        }
    });

    return (
        <div className="container">
            <div className="row signup-container">
                <div className="col-lg-6">
                    <form className='forms' onSubmit={formik.handleSubmit}>
                        <h1 className='text-center'>Signup</h1>
                        <p className='text-center'>Please fill in this form to create an account.</p>

                        <div className='my-3'>
                            <label htmlFor="firstname" className="form-label d-none">First Name</label>
                            <input
                                type="text"
                                placeholder='Enter First Name'
                                id='firstname'
                                name='firstname'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.firstname}
                            />
                        </div>

                        {/* display message if firstname is empty or invalid */}
                        {
                            formik.touched.firstname && formik.errors.firstname ?
                                <><LuAlertCircle className='text-danger me-2' /><small className="text-danger">{formik.errors.firstname}</small>
                                </> : null
                        }

                        <div className='my-3'>
                            <label htmlFor="lastname" className="form-label d-none">Last Name</label>
                            <input
                                type="text"
                                placeholder='Enter Last Name'
                                id='lastname'
                                name='lastname'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.lastname}
                            />
                        </div>

                        {/* display message if lastname is empty or invalid */}
                        {
                            formik.touched.lastname && formik.errors.lastname ?
                                <><LuAlertCircle className='text-danger me-2' /><small className="text-danger">{formik.errors.lastname}</small>
                                </> : null
                        }

                        <div className='my-3'>
                            <label htmlFor="email" className="form-label d-none">Email</label>
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

                        {/* display message if email is empty or invalid */}
                        {
                            formik.touched.email && formik.errors.email ?
                                <><LuAlertCircle className='text-danger me-2' /><small className="text-danger">{formik.errors.email}</small>
                                </> : null
                        }

                        <div className='my-3'>
                            <label htmlFor="password" className="form-label d-none">Password</label>
                            <input
                                type="password"
                                placeholder='Enter Password'
                                id='password'
                                name='password'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                            />
                        </div>

                        {/* display message if password is empty or invalid */}
                        {
                            formik.touched.password && formik.errors.password ?
                                <><LuAlertCircle className='text-danger me-2' /><small className="text-danger">{formik.errors.password}</small>
                                </> : null
                        }

                        <div className='my-3'>
                            <label htmlFor="phoneno" className="form-label d-none">Phone No</label>
                            <input
                                type="tel"
                                placeholder='Enter PhoneNo'
                                id='phoneno'
                                name='phoneno'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.phoneno}
                            />
                        </div>

                        {/* display message if phone no is empty or invalid */}
                        {
                            formik.touched.phoneno && formik.errors.phoneno ?
                                <><LuAlertCircle className='text-danger me-2' /><small className="text-danger">{formik.errors.phoneno}</small>
                                </> : null
                        }

                        {/* display message if error is occured */}
                        {
                            isError ? <><LuAlertCircle className='text-danger me-2' /><small className="text-danger">{isError}</small> </> : null
                        }

                        {
                            isLoading ? (
                                <div className='text-center'>
                                    <button type="submit" className='loadingbutton' onClick={formik.handleSubmit}><div className='spinner'></div></button>
                                </div>
                            ) : (
                                <div className='text-center'>
                                    <button type="submit" className='button' onClick={formik.handleSubmit}>Signup</button>
                                </div>
                            )
                        }

                    </form>
                </div>
                <div className="col-lg-6">
                    <div className="overlay-container">
                        <div className="overlay">
                            <div className="overlay-panel overlay-left">
                                <h1>Welcome Back!</h1>
                                <p>To keep connected with us please login with your personal info</p>
                                <Link to={"/"}>
                                    <button className="button" >
                                        Sign In
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup