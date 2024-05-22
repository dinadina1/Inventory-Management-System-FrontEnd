// import required packages
import { useFormik } from "formik";
import { LuAlertCircle } from "react-icons/lu";
import { Link } from "react-router-dom";
import userService from "../../../Services/UserService";

// formik validation
const validate = values => {

  // define errors object
  const errors = {};

  // Check if company name is empty or valid
  if (!values.companyName) {
    errors.companyName = 'Company name is required';
  } else if (values.companyName.length < 3) {
    errors.companyName = 'Company name must be at least 3 characters';
  }

  // Check if owner name is empty or valid
  if (!values.ownerName) {
    errors.ownerName = 'Vendor name is required';
  } else if (values.ownerName.length < 3) {
    errors.ownerName = 'Vendor name must be at least 3 characters';
  }

  // Check if email is empty or valid
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  // Check if gst no is empty or valid
  if (!values.gstNumber) {
    errors.gstNumber = 'GST no is required';
  } else if (values.gstNumber.length !== 15) {
    errors.gstNumber = 'GST no must be 15 characters';
  }

  // Check if phone no is empty or valid
  if (!values.phoneNo) {
    errors.phoneNo = 'Phone no is required';
  } else if (values.phoneNo.length < 10 && values.phoneNo.length > 10) {
    errors.phoneNo = 'Phone no must be 10 characters';
  }

  // Check if street is empty or valid
  if (!values.street) {
    errors.street = 'Street is required';
  } else if (values.street.length < 3) {
    errors.street = 'Street must be at least 3 characters';
  }

  // Check if city is empty or valid
  if (!values.city) {
    errors.city = 'City is required';
  } else if (values.city.length < 3) {
    errors.city = 'City must be at least 3 characters';
  }

  // Check if state is empty or valid
  if (!values.state) {
    errors.state = 'State is required';
  } else if (values.state.length < 3) {
    errors.state = 'State must be at least 3 characters';
  }

  // Check if country is empty or valid
  if (!values.country) {
    errors.country = 'Country is required';
  } else if (values.country.length < 3) {
    errors.country = 'Country must be at least 3 characters';
  }

  // Check if pincode is empty or valid
  if (!values.pincode) {
    errors.pincode = 'Pincode is required';
  } else if (values.pincode.length < 3) {
    errors.pincode = 'Pincode must be at least 3 characters';
  }

  // return errors object
  return errors;
};

const RegisterVendor = () => {

  // define formik
  const formik = useFormik({
    initialValues: {
      companyName: '',
      ownerName: '',
      email: '',
      gstNumber: '',
      phoneNo: '',
      street: '',
      city: '',
      state: '',
      country: '',
      pincode: ''
    },
    validate,
    onSubmit: async (values) => {

      // update value object
      const registerValues = {
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
        console.log(values);
        // api to register new vendor
        const response = await userService.registerVendor(registerValues);

        // check if response is successfull
        if (response) {
          alert("Vendor registered successfully");

          // reset form
          formik.resetForm();
        }

      } catch (err) {
        console.log(err);
      }
    }
  });

  return (
    <div className="container">
      <div className="row signup-container">
        <div className="col-lg-12">
          <form className='forms' onSubmit={formik.handleSubmit}>
            <h1 className='text-center'>Register new Vendor</h1>

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

            <div className='text-center mt-3'>
              <button type="submit" onClick={formik.handleSubmit} className='button'>Register</button>
              <Link to={"/vendor/all"}>
                <button className='editButton pt-2.5 ms-3'>Cancel</button>
              </Link>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}

export default RegisterVendor