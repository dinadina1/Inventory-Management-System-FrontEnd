// import required packages
import { useFormik } from 'formik';
import React, { useContext, useEffect } from 'react'
import { LuAlertCircle } from 'react-icons/lu';
import { useNavigate, useParams } from 'react-router-dom'
import AppContext from '../../Context/LevelContext';

// formik validation
const validate = values => {

  // define errors object
  const errors = {};

  // check password is empty or valid
  if (!values.newPassword) {
    errors.newPassword = 'Password is required';
  } else if (values.newPassword.length < 6) {
    errors.newPassword = 'Password must be at least 6 characters';
  }

  // check if confirm password is empty or valid
  if (!values.confirmPassword) {
    errors.confirmPassword = 'Confirm Password is required';
  } else if (values.confirmPassword !== values.newPassword) {
    errors.confirmPassword = 'Both Passwords does not match';
  }

  // return errors object
  return errors;

}

const ResetPassword = () => {

  // use useContext
  const { isLoading, isError, navigation, setNavigation, isPasswordReset, setIsPasswordReset, resetPassword } = useContext(AppContext);

  // define useNavigate
  const navigate = useNavigate();

  // Get the resetCode parameter from the URL
  const { resetCode } = useParams();

  // check if navigation is not null then navigate to navigation
  useEffect(() => {
    if (navigation) {
      setTimeout(() => {
        navigate(navigation);
        setNavigation(null);
      }, 2000);
    }
  }, [navigation]);

  // Change navigate to login
  const backtoHome = () => {
    navigate("/login");
    setIsPasswordReset(false);
  }

  // formik form
  const formik = useFormik({
    initialValues: {
      newPassword: '',
      confirmPassword: ''
    }, validate,
    onSubmit: async (values) => {
      values.resetCode = resetCode;
      await resetPassword(values);
    }
  });

  return (
    <>
      {
        isPasswordReset ? (
          <div className="container">
            <div className="row signup-container">
              <div className="col-lg-6">
                <h5 className='text-center'>Password Reset Successfully.</h5>
                <div className="text-center">
                  <button className='button' onClick={backtoHome}>Back to Login</button>
                </div>
              </div>
            </div>
          </div>

        ) : (

          <div className="container">
            <div className="row signup-container">
              <div className="col-lg-6">
                <form className='forms' onSubmit={formik.handleSubmit}>
                  <h1 className='text-center'>Reset Password</h1>

                  <div className='my-3'>
                    <label htmlFor="password" className="form-label d-none">Password</label>
                    <input
                      type="password"
                      placeholder='Enter New Password'
                      id='password'
                      name='newPassword'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.newPassword}
                    />
                  </div>

                  {/* display message if password is empty or invalid */}
                  {
                    formik.touched.newPassword && formik.errors.newPassword ?
                      <><LuAlertCircle className='text-danger me-2' /><small className="text-danger">{formik.errors.newPassword}</small>
                      </> : null
                  }

                  <div className='my-3'>
                    <label htmlFor="confirmpassword" className="form-label d-none">Password</label>
                    <input
                      type="password"
                      placeholder='Enter Confirm Password'
                      id='confirmpassword'
                      name='confirmPassword'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.confirmPassword}
                    />
                  </div>

                  {/* display message if password is empty or invalid */}
                  {
                    formik.touched.confirmPassword && formik.errors.confirmPassword ?
                      <><LuAlertCircle className='text-danger me-2' /><small className="text-danger">{formik.errors.confirmPassword}</small>
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
                        <button type="submit" className='button' onClick={formik.handleSubmit}>Save</button>
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

export default ResetPassword