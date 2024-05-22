// import required packages
import { MdOutlineDescription } from "react-icons/md"
import { IoMdPricetag } from "react-icons/io"
import { FaFileInvoiceDollar } from "react-icons/fa"
import { MdConfirmationNumber } from "react-icons/md";
import { MdProductionQuantityLimits } from "react-icons/md";
import { Link } from "react-router-dom"

const PurchaseCard = ({ purchase, handleDelete }) => {
    return (
        <>
            <div className="col-lg-6 col-md-6 mb-2">
                <div className="card">
                    <div className="card-body">
                        <div className="row">

                            <div className="col-lg-8 col-md-8 col-sm-12">
                                <Link to={`/purchase/${purchase._id}`} className="text-decoration-none text-dark">

                                    <article className="py-2 px-2">
                                        <h4>{purchase.productItem}</h4>
                                    </article>

                                    <article className="py-2">
                                        <span className="fw-bold px-2"> <MdOutlineDescription style={{ color: "#666769", fontSize: "20px" }} /> Description:</span>
                                        <span className="card-text">
                                            {
                                                purchase.description.length < 20 ? purchase.description : purchase.description.slice(0, 20) + "..."
                                            }
                                        </span>
                                    </article>

                                    <article className="py-2">
                                        <span className="fw-bold px-2"> <MdConfirmationNumber style={{ color: "#666769", fontSize: "20px" }} /> Purchase Order No:</span>
                                        <span className="card-text">
                                            {purchase.purchaseOrderNo}
                                        </span>
                                    </article>

                                    <article className="py-2">
                                        <span className="fw-bold px-2"> <IoMdPricetag style={{ color: "#666769", fontSize: "20px" }} /> Unit Price: </span>
                                        <span className="card-text">{purchase.unitPrice}</span>
                                    </article>

                                    <article className="py-2">
                                        <span className="fw-bold px-2"> <MdProductionQuantityLimits style={{ color: "#666769", fontSize: "20px" }} /> Quantity: </span>
                                        <span className="card-text">{purchase.quantity}</span>
                                    </article>

                                    <article className="py-2">
                                        <span className="fw-bold px-2">  <FaFileInvoiceDollar style={{ color: "#666769", fontSize: "20px" }} /> Invoice no:  </span>
                                        <span className="card-text">
                                            {purchase.invoiceNo}
                                        </span>
                                    </article>
                                </Link>
                            </div>
                            <div className="col-4 col-md-4 col-sm-12 mt-3">
                                <div className="d-flex flex-column gap-3 align-items-center">
                                    <Link to={`/purchase/edit/${purchase._id}`}>
                                        <button type="submit" className="editButton" style={{ padding: "12px 53px" }}>Edit</button>
                                    </Link>
                                    <button type="submit" onClick={() => handleDelete(purchase._id)} className="editButton" style={{ backgroundColor: "orangered" }}>Delete</button>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}

export default PurchaseCard