// import required packages
import { useEffect, useState } from "react"
import userService from "../../../Services/UserService";
import { Link, useParams } from "react-router-dom";
import TableRow from "../Users/TableRow";

const VendorDet = () => {

    // state for vendor info
    const [vendorInfo, setVendorInfo] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    // define useparams
    const { id } = useParams();

    // define useEffect
    useEffect(() => {

        // Function to find particular vendor
        const findVendor = async () => {

            // Call API
            const response = await userService.getVendor(id);
            try {

                // update state
                setIsLoading(false);
                setVendorInfo(response.data);
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        // call the function
        findVendor();
    }, [id]);

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
                        <h1 className="ps-5 ms-2 pt-3 pb-3">Vendor Details</h1>
                        <div className="container box-shadow p-5">
                            <table className="table table-striped m-3">
                                <tbody className="text-center">
                                    <TableRow label="Company Name" value={vendorInfo.companyName} />
                                    <TableRow label="Vendor Name" value={vendorInfo.ownerName} />
                                    <TableRow label="Address" value={`${vendorInfo.address.street}, ${vendorInfo.address.city}, ${vendorInfo.address.state}, ${vendorInfo.address.country}`} />
                                    <TableRow label="Pincode" value={vendorInfo.address.pincode} />
                                    <TableRow label="Contact Number" value={vendorInfo.phoneNo} />
                                    <TableRow label="Email" value={vendorInfo.email} />
                                    <TableRow label="GST Number" value={vendorInfo.gstNumber} />
                                    {
                                        vendorInfo.createdBy !== null && (
                                            <TableRow label="Created By" value={`${vendorInfo.createdBy.firstname} ${vendorInfo.createdBy.lastname}`} />
                                        )
                                    }
                                    <TableRow label="Created At" value={vendorInfo.createdAt} />

                                </tbody>
                            </table>

                            <div className="text-center">
                                <Link to={"/vendor/all"}>
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

export default VendorDet