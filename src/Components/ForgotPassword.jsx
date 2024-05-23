// import required packages
import { useFormik } from 'formik';
import React, { useContext } from 'react'
import { LuAlertCircle } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom'
import AppContext from '../../Context/LevelContext';

// formik validation
const validate = values => {

  // define errors object
  const errors = {};

  // check if email is empty or valid
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  // return errors object
  return errors;

}

const ForgotPassword = () => {

  // use useContext
  const { forgotPassword, isMailSent, isLoading, isError, setIsMailSent } = useContext(AppContext);

  // define useNavigate
  const navigate = useNavigate();

  // Change navigate to login
  const backtoHome = () => {
    navigate("/login");

    setIsMailSent(false);
  }

  // formik form
  const formik = useFormik({
    initialValues: {
      email: ''
    }, validate,
    onSubmit: async (values) => {
      await forgotPassword(values);
    }
  });

  return (
    <>
      {
        isMailSent ? (
          <div className="container">
            <div className="row signup-container">
              <div className="col-lg-6">
                <h5 className='text-center'>Password Reset Link Sent via email.</h5>
                <p className='text-center'>Please Check for the email.</p>
                <div className="text-center">
                  <button className='button' onClick={backtoHome}>Back to Home</button>
                </div>
              </div>
            </div>
          </div>

        ) : (

          <div className="container">
            <div className="row signup-container">
              <div className="col-lg-6">
                <form className='forms' onSubmit={formik.handleSubmit}>
                  <h1 className='text-center'>Forgot Password</h1>

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

                  {/* display message if error is occured */}
                  {
                    isError ? <><LuAlertCircle className='text-danger me-2' /><small className="text-danger">{isError}</small> </> : null
                  }

                  {
                    isLoading ? (
                      <div className='text-center pt-3'>
                        <button type="submit" className='loadingbutton' onClick={formik.handleSubmit}><div className='spinner'></div></button>
                      </div>
                    ) : (
                      <div className='text-center pt-3'>
                        <button type="submit" className='button' onClick={formik.handleSubmit}>Send mail</button>
                      </div>
                    )
                  }

                </form>
              </div>

            </div>
          </div>
        )
      }

    </>
  )
}

export default ForgotPassword