import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LuAlertCircle } from 'react-icons/lu';
import { useFormik } from 'formik';
import userService from '../../Services/UserService';

const validate = values => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }

  return errors;
};

const Login = () => {

  // State
  const [isError, serIsError] = useState(null);

  // define useNavigate
  const navigate = useNavigate();

  // State
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      return navigate("/");
    }
  }, [isLoading, setIsLoading]);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validate,
    onSubmit: async (values) => {
      try {

        setIsLoading(true);
        const response = await userService.login(values);
        if (response) {

          // Set token in Local Storage
          localStorage.setItem('authToken', response.data.authToken);

          setTimeout(() => {
            setIsLoading(false);
           navigate("/");
          }, 1000);
        }
      } catch (err) {
        serIsError(err.response.data.message);
        setIsLoading(false);
        console.log(err);
        setTimeout(() => {
          serIsError(null);
        }, 3000);
      }
    }
  });

  return (
    <div className="container">
      <div className="row signup-container">
        <div className="col-lg-6">
          <form className='forms' onSubmit={formik.handleSubmit}>
            <h1 className='text-center'>Signin</h1>

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

            {formik.touched.email && formik.errors.email && (
              <>
                <LuAlertCircle className='text-danger me-2' />
                <small className="text-danger">{formik.errors.email}</small>
              </>
            )}

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

            {formik.touched.password && formik.errors.password && (
              <>
                <LuAlertCircle className='text-danger me-2' />
                <small className="text-danger">{formik.errors.password}</small>
              </>
            )}

            {isError && (
              <>
                <LuAlertCircle className='text-danger me-2' />
                <small className="text-danger">{isError}</small>
              </>
            )}

            <Link className='fw-bold text-center d-block pt-2' to={"/forgot-password"}>Forgot Your Password</Link>

            <div className='text-center pt-3'>
              {isLoading ? (
                <button type="submit" className='loadingbutton'><div className='spinner'></div></button>
              ) : (
                <button type="submit" onClick={formik.handleSubmit} className='button'>Sign in</button>
              )}
            </div>

          </form>
        </div>
        <div className="col-lg-6">
          <div className="overlay-panel overlay-right">
            <h1>Hello, Explorer!</h1>
            <p>Enter your personal details and start journey with us</p>
            <Link to={"/signup"}>
              <button className="button" id="signUp">Sign Up</button>
            </Link>
          </div>
          <div className="alert alert-primary alert-dismissible fade show mt-4" role="alert">
            <section className='d-flex gap-5'>
              <article>
                <h5><b>Admin</b></h5>
                <p><b>Email:</b> admin@gmail.com</p>
                <p><b>Password:</b> admin123</p>
              </article>
              <article>
                <h5><b>User</b></h5>
                <p><b>Email:</b> hacker@gmail.com</p>
                <p><b>Password:</b> hacker123</p>
              </article>
            </section>
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
