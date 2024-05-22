// import required packages
import { FaAddressBook } from "react-icons/fa6";
import { MdMarkEmailRead } from "react-icons/md";
import { HiMiniBuildingStorefront } from "react-icons/hi2";
import { Link } from "react-router-dom";

const VendorCard = ({ data, handleDelete }) => {

    return (
        <>
            <div className="col-lg-12 col-md-12 m-2">
                <div className="card">
                    <div className="card-body">
                        <div className="row">

                            <div className="col-lg-8 col-md-8 col-sm-12">
                                <Link to={`/vendor/${data._id}`} className="text-decoration-none text-dark">

                                    <article className="py-2 px-2">
                                        <h4>{data.companyName}</h4>
                                    </article>

                                    <article className="py-2">
                                        <span className="fw-bold px-2"> <FaAddressBook style={{ color: "#666769", fontSize: "20px" }} /> Address:</span>
                                        <span className="card-text">
                                            {` ${data.address.street}, ${data.address.city}, ${data.address.state}, ${data.address.country}`}
                                        </span>
                                    </article>

                                    <article className="py-2">
                                        <span className="fw-bold px-2"> <MdMarkEmailRead style={{ color: "#666769", fontSize: "20px" }} />  Email: </span>
                                        <span className="card-text">{data.email}</span>
                                    </article>

                                    <article className="py-2">
                                        <span className="fw-bold px-2">  <HiMiniBuildingStorefront style={{ color: "#666769", fontSize: "20px" }} /> GST:  </span>
                                        <span className="card-text">
                                            {data.gstNumber}
                                        </span>
                                    </article>
                                </Link>
                            </div>
                            <div className="col-4 col-md-4 col-sm-12 mt-3">
                                <div className="d-flex flex-column gap-3 align-items-center">
                                    <Link to={`/vendor/edit/${data._id}`}>
                                        <button type="submit" className="editButton" style={{ padding: "12px 53px" }}>Edit</button>
                                    </Link>
                                    <button type="submit" onClick={() => handleDelete(data._id)} className="editButton" style={{ backgroundColor: "orangered" }}>Delete</button>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}

export default VendorCard