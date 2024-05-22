// import required packages
import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik"
import { LuAlertCircle } from "react-icons/lu";
import { Link } from "react-router-dom";
import userService from "../../../Services/UserService";

// formik validation
const validate = values => {

    // define errors object
    const errors = {};

    // check if firstname is empty or valid
    if (!values.firstname) {
        errors.firstname = 'Firstname is Required';
    } else if (values.firstname.length < 3) {
        errors.firstname = 'Must be 3 characters or more';
    }

    // check if lastname is empty or valid
    if (!values.lastname) {
        errors.lastname = 'Lastname is Required';
    }

    // check if email is empty or valid
    if (!values.email) {
        errors.email = 'Email is Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    // check if password is empty or valid
    if (!values.password) {
        errors.password = 'Password is Required';
    } else if (values.password.length < 6) {
        errors.password = 'Password be 6 characters or more';
    }

    // check if phoneno is empty or valid
    if (!values.phoneno) {
        errors.phoneno = 'Phone Number is Required';
    } else if ((values.phoneno).toString().length !== 10) {
        errors.phoneno = 'Phone Number must be 10 digits';
    }

    // check if role is empty or valid
    if (!values.role) {
        errors.role = 'Role is Required';
    }

    // return errors object
    return errors;
};

const CreateUser = () => {

    // define navigate
    const navigate = useNavigate();

    // define formik
    const formik = useFormik({
        initialValues: {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            phoneno: '',
            role: ''
        },
        enableReinitialize: true,
        validate,
        onSubmit: async (values) => {
            console.log(values);
            try {

                // API to register new user
                const response = await userService.registerUser(values);

                // check if response is success
                alert(response.data.message);
                formik.resetForm();
                navigate("/user/all");

            } catch (err) {
                // check if response is error
                alert(err.response.data.message);
                console.log(err);
            }
        }
    });

    return (
        <>
            <div className="container">
                <div className="row signup-container">
                    <div className="col-lg-12">
                        <form className='forms' onSubmit={formik.handleSubmit}>
                            <h1 className='text-center'>Register New User</h1>

                            <div className="row">

                                <div className="col-lg-6 col-sm-12">
                                    <div className='my-3'>
                                        <label htmlFor="firstname" className="form-label fw-bold">First Name:</label>
                                        <input
                                            type="text"
                                            placeholder='Enter First Name'
                                            id="firstname"
                                            name="firstname"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.firstname}
                                        />

                                        {/* display message if firstname is empty or valid */}
                                        {
                                            formik.touched.firstname && formik.errors.firstname ? (
                                                <><LuAlertCircle className='text-danger me-2' /><small className="text-danger">{formik.errors.firstname}</small></>
                                            ) : null
                                        }
                                    </div>
                                </div>

                                <div className="col-lg-6 col-sm-12">
                                    <div className='my-3'>
                                        <label htmlFor="lastname" className="form-label fw-bold">Last Name:</label>
                                        <input
                                            type="text"
                                            placeholder='Enter Last Name'
                                            id="lastname"
                                            name="lastname"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.lastname}
                                        />

                                        {/* display message if lastname is empty or valid */}
                                        {
                                            formik.touched.lastname && formik.errors.lastname ? (
                                                <><LuAlertCircle className='text-danger me-2' /><small className="text-danger">{formik.errors.lastname}</small></>
                                            ) : null
                                        }
                                    </div>
                                </div>

                                <div className="col-lg-6 col-sm-12">
                                    <div className='my-3'>
                                        <label htmlFor="email" className="form-label fw-bold">Email:</label>
                                        <input
                                            type="email"
                                            placeholder="Ex: johndeo@gmail.com"
                                            id="email"
                                            name="email"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.email}
                                        />

                                        {/* display message if email is empty or valid */}
                                        {
                                            formik.touched.email && formik.errors.email ? (
                                                <><LuAlertCircle className='text-danger me-2' /><small className="text-danger">{formik.errors.email}</small></>
                                            ) : null
                                        }
                                    </div>
                                </div>

                                <div className="col-lg-6 col-sm-12">
                                    <div className='my-3'>
                                        <label htmlFor="password" className="form-label fw-bold">Password:</label>
                                        <input
                                            type="password"
                                            placeholder="Enter Password"
                                            id="password"
                                            name="password"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.password}
                                        />

                                        {/* display message if password is empty or valid */}
                                        {
                                            formik.touched.password && formik.errors.password ? (
                                                <><LuAlertCircle className='text-danger me-2' /><small className="text-danger">{formik.errors.password}</small></>
                                            ) : null
                                        }
                                    </div>
                                </div>

                                <div className="col-lg-6 col-sm-12">
                                    <div className='my-3'>
                                        <label htmlFor="phoneno" className="form-label fw-bold">Phone Number:</label>
                                        <input
                                            type="number"
                                            placeholder="Enter Phone Number"
                                            id="phoneno"
                                            name="phoneno"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.phoneno}
                                        />

                                        {/* display message if phoneno is empty or valid */}
                                        {
                                            formik.touched.phoneno && formik.errors.phoneno ? (
                                                <><LuAlertCircle className='text-danger me-2' /><small className="text-danger">{formik.errors.phoneno}</small></>
                                            ) : null
                                        }
                                    </div>
                                </div>

                                <div className="col-lg-6 col-sm-12">
                                    <div className='my-3'>
                                        <label htmlFor="role" className="form-label fw-bold">Role:</label>
                                        <select name="role" className='' id="role" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.role}>
                                            <option value="">Select Role</option>
                                            <option value="admin">Admin</option>
                                            <option value="user">User</option>
                                        </select>

                                        {/* display message if role is empty or valid */}
                                        {
                                            formik.touched.role && formik.errors.role ? (
                                                <><LuAlertCircle className='text-danger me-2' /><small className="text-danger">{formik.errors.role}</small></>
                                            ) : null
                                        }
                                    </div>
                                </div>

                            </div>

                            <div className='text-center'>
                                <button type="submit" onClick={formik.handleSubmit} className='button'>Register</button>
                                <Link to={"/user/all"}>
                                    <button className='editButton pt-2.5 ms-3'>Cancel</button>
                                </Link>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateUser