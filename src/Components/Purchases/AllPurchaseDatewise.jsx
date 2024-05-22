// import required packages
import { useFormik } from 'formik';
import { useState } from 'react'
import { LuAlertCircle } from 'react-icons/lu';
import userService from '../../../Services/UserService';
import PurchaseTableRow from './PurchaseTableRow';

const AllPurchaseDatewise = () => {

  // States
  const [purchaseList, setPurchaseList] = useState('');
  const [isError, setIsError] = useState(null);

  // Formik form
  const formik = useFormik({
    initialValues: {
      date: '',
    }, validate: values => {

      // define errors object
      let errors = {};

      // check if date is empty
      if (!values.date) {
        errors.date = 'Date is Required';
      }

      // return errors object
      return errors;
    },
    onSubmit: async (values) => {
      try {
        // Get data from the API
        const response = await userService.allPurchaseDatewise(values.date);

        // update states
        setPurchaseList(response.data);
        setIsError(null);

      } catch (err) {
        console.log(err);

        // update states
        setPurchaseList(null);
        setIsError("Purchase Order Not found for the date");
      }
    }
  });

  return (
    <>
      <div className="container p-3" >
        <div className="row">
          <div className="col-lg-12">
            <h1 className="text-center">Purchase Orders Datewise</h1>
          </div>

          <form onSubmit={formik.handleSubmit}>
            <div className="row">
              <div className="col-lg-6 col-sm-12 p-3">
                <label className="form-label fw-bold" htmlFor="date">Select Date:</label>
                <input
                  type="date"
                  id="date"
                  className="form-control pt-2 pb-2"
                  placeholder="Enter Date"
                  name="date"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.date}
                />

                {/* Show error message if date is empty */}
                {formik.touched.date && formik.errors.date ? (
                  <div className="mb-2">
                    <LuAlertCircle className='text-danger me-2' />
                    <small className="text-danger">{formik.errors.date}</small>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="col-lg-6 col-sm-12 pb-3 ps-1">
              <button className="button" onClick={formik.handleSubmit} type="submit">Search</button>
            </div>
          </form>
        </div>

        {/* Show message if errors is occured */}
        {isError && (
          <div className="alert alert-danger mt-3">{isError}</div>
        )}

      </div>

      {
        purchaseList && (
          <div className="container-fluid overflow-y-auto overflow-x-auto">
            <table className="table table-striped w-100">
              <thead>
                <tr>
                  <th>SNO</th>
                  <th>Order Date</th>
                  <th>Purchase Order no</th>
                  <th>Product Item</th>
                  <th>Description</th>
                  <th>Quantity</th>
                  <th>Unit Price</th>
                  <th>Total Amount</th>
                  <th>Invoice no</th>
                  <th>Delivery Date</th>
                  <th>Vendor</th>
                  <th>Location</th>
                  <th>Delivery Status</th>
                  <th>Payment Status</th>
                  <th>Created By</th>
                </tr>
              </thead>
              <tbody>
                {
                  purchaseList.map((purchase, index) => {
                    return <PurchaseTableRow key={index} purchase={purchase} SNO={index + 1} />
                  })
                }
              </tbody>
            </table>
          </div>
        )
      }
    </>
  )
}

export default AllPurchaseDatewise
