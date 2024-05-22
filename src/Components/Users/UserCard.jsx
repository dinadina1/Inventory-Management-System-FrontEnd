// import required packages
import { MdMarkEmailRead } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { LiaCriticalRole } from "react-icons/lia";
import { IoMdCreate } from "react-icons/io";
import { Link } from "react-router-dom";

// define component
const UserCard = ({ user, handleDelete }) => {

    // Get created At
    const createdAt = new Date(user.createdAt).toLocaleDateString();

    return (
        <div className="col-lg-6 col-sm-12 mb-4">
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-lg-8 col-sm-12">
                            <h5 className="card-title">{`${user.firstname} ${user.lastname}`}</h5>

                            <article className="py-2">
                                <MdMarkEmailRead className="card-icon me-2" style={{ height: "20px", width: "20px" }} />
                                <span className="fw-bold me-2">Email:</span>
                                <span className="card-text">{user.email}</span>
                            </article>

                            <article className="py-2">
                                <FaPhoneAlt className="card-icon me-2" style={{ height: "20px", width: "20px" }} />
                                <span className="fw-bold me-2">Phone No:</span>
                                <span className="card-text">{user.phoneno}</span>
                            </article>

                            <article className="py-2">
                                <LiaCriticalRole className="card-icon me-2" style={{ height: "20px", width: "20px" }} />
                                <span className="fw-bold me-2">Role:</span>
                                <span className="card-text">{user.role}</span>
                            </article>

                            <article className="py-2">
                                <IoMdCreate className="card-icon me-2" style={{ height: "20px", width: "20px" }} />
                                <span className="fw-bold me-2">Created At:</span>
                                <span className="card-text">{createdAt}</span>
                            </article>
                        </div>

                        <div className="col-4 col-md-4 col-sm-12 mt-3">
                            <div className="d-flex flex-column gap-3 align-items-center">
                                <Link to={`/user/edit/${user._id}`}>
                                    <button type="submit" className="editButton" style={{ padding: "12px 53px" }}>Edit</button>
                                </Link>
                                <button type="submit" onClick={() => handleDelete(user._id)} className="editButton" style={{ backgroundColor: "orangered" }}>Delete</button>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}

// export component
export default UserCard