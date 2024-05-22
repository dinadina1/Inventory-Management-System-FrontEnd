// import required packages
import { useState } from 'react';
import { useEffect } from "react"
import userService from "../../../Services/UserService";
import { Link, useParams } from "react-router-dom";
import TableRow from '../Users/TableRow';

const PurchaseDet = () => {

    // State to store the purchase order
    const [purchase, setPurchase] = useState({});

    // State to isLoading
    const [isLoading, setIsLoading] = useState(true);

    // define params
    const { id } = useParams();

    // useEffect to get a purchase order
    useEffect(() => {

        // Function to get a purchase order from the API
        const getPurchaseOrder = async () => {
            try {

                // call api function from userService
                const response = await userService.getPurchaseById(id);

                // update state
                setPurchase(response.data);
                setIsLoading(false);

            } catch (err) {
                alert(err.response.data.message);
                console.log(err);
            }
        }

        // call the function
        getPurchaseOrder();
    }, []);

    return (
        <>
            {
                isLoading ? (
                    <div className="container" style={{ height: "90vh" }}>
                        <div className="d-flex justify-content-center">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    </div>

                ) : (

                    <>
                        <h1 className="ps-5 ms-2 pt-3 pb-3">Product Details</h1>
                        <div className="container box-shadow p-5">
                            <table className="table table-striped m-3">
                                <tbody className="text-center">

                                    <TableRow label="Purchase Order No" value={purchase.purchaseOrderNo} />
                                    <TableRow label="Product Item" value={purchase.productItem} />
                                    <TableRow label="Description" value={purchase.description} />
                                    <TableRow label="Quantity" value={purchase.quantity} />
                                    <TableRow label="Unit Price" value={purchase.unitPrice} />
                                    <TableRow label="Total Price" value={purchase.totalPrice} />
                                    <TableRow label="Order Date" value={purchase.orderDate} />
                                    <TableRow label="Delivery Date" value={purchase.deliveryDate} />
                                    <TableRow label="Vendor Name" value={purchase.vendor.companyName} />
                                    <TableRow label="Vendor Address" value={`${purchase.vendor.address.street}, ${purchase.vendor.address.city}, ${purchase.vendor.address.state}, ${purchase.vendor.address.country}, ${purchase.vendor.address.pincode}`} />
                                    <TableRow label="Vendor Contact" value={purchase.vendor.phoneNo} />
                                    <TableRow label="Vendor Email" value={purchase.vendor.email} />
                                    <TableRow label="Delivery Status" value={purchase.deliveryStatus} />
                                    <TableRow label="Payment Status" value={purchase.paymentStatus} />
                                    <TableRow label="Location" value={purchase.location} />
                                    <TableRow label="Created By" value={`${purchase.createdBy.firstname} ${purchase.createdBy.lastname}`} />

                                </tbody>
                            </table>

                            <div className="text-center">
                                <Link to={"/purchase/all"}>
                                    <button className="button">Back</button>
                                </Link>
                            </div>

                        </div>
                    </>
                )
            }
        </>
    )
}

export default PurchaseDet