// import required packages
import { useState } from "react"
import userService from "../../../Services/UserService";
import { useFormik } from "formik";
import { LuAlertCircle } from "react-icons/lu";
import StateTableRow from "./StateTableRow";

const VendorCitywise = () => {

  // States
  const [vendors, setVendors] = useState(null);
  const [isError, setIsError] = useState(null);

  // Formik form
  const formik = useFormik({
    initialValues: {
      city: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.city) {
        errors.city = "City is required";
      }
      return errors;
    },
    onSubmit: async (values) => {
      try {
        // Get data from the API
        const response = await userService.allVendorsCitywise(values.city);

        // update states
        setVendors(response.data);
        setIsError(null);

      } catch (err) {
        console.log(err);

        // update states
        setVendors(null);
        setIsError("Vendor Not found for the city");
      }
    },
  });

  return (
    <>
      <div className="container p-3" >
        <div className="row">
          <div className="col-lg-12">
            <h1 className="text-center">Vendor Citywise</h1>
          </div>

          <form onSubmit={formik.handleSubmit}>
            <div className="row">
              <div className="col-lg-6 col-sm-12 p-3">
                <label className="form-label fw-bold" htmlFor="search">City Name:</label>
                <input
                  type="search"
                  id="search"
                  className="form-control pt-2 pb-2"
                  placeholder="Enter City Name"
                  name="city"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.city}
                />
                {formik.touched.city && formik.errors.city ? (
                  <div className="mb-2">
                    <LuAlertCircle className='text-danger me-2' />
                    <small className="text-danger">{formik.errors.city}</small>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="col-lg-6 col-sm-12 pb-3 ps-1">
              <button className="button" onClick={formik.handleSubmit} type="submit">Search</button>
            </div>
          </form>
        </div>

        {isError && (
          <div className="alert alert-danger mt-3">{isError}</div>
        )}

      </div>
      <div className="container-fluid overflow-y-auto overflow-x-auto">
        {
          vendors && (
            <div className="table-responsive mt-3">
              <table className="table table-striped w-100">
                <thead>
                  <tr>
                    <th>SNO</th>
                    <th>Vendor Name</th>
                    <th>Company Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>GST No</th>
                    <th>Address</th>
                  </tr>
                </thead>
                <tbody>
                  {vendors.map((vendor, index) => {
                    return <StateTableRow key={index} vendor={vendor} SNO={index + 1} />
                  })}
                </tbody>
              </table>
            </div>
          )
        }
      </div>
    </>
  )
}

export default VendorCitywise;
