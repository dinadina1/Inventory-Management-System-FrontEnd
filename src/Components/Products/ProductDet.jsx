// import required packages
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import userService from "../../../Services/UserService";
import TableRow from "../Users/TableRow";

const ProductDet = () => {

    // State for loading
    const [isLoading, setIsLoading] = useState(true);

    // State for product
    const [product, setProduct] = useState({});

    // define useparams
    const { id } = useParams();

    // define useEffect
    useEffect(() => {

        // Function to find particular product
        const findProduct = async () => {

            // Call API
            const response = await userService.getParticularProduct(id);
            try {
                // update states
                setIsLoading(false);
                setProduct(response.data);

            } catch (error) {
                console.log(error);
            }
        };

        // call the function
        findProduct();
    }, [id]);

    return (
        <>
            {
                isLoading ? (
                    <div className="container" style={{ height: "90vh" }} >
                        <div className="d-flex justify-content-center">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    </div >
                ) : (
                    <>
                        <h1 className="ps-5 ms-2 pt-3 pb-3">Product Details</h1>
                        <div className="container box-shadow p-5">
                            <table className="table table-striped m-3">
                                <tbody className="text-center">
                                    <TableRow label="Product Name" value={product.productName} />
                                    <TableRow label="Description" value={product.description} />
                                    <TableRow label="Price" value={product.price} />
                                    <TableRow label="Invoice no" value={product.invoiceNo} />
                                    <TableRow label="Vendor" value={product.vendor.companyName} />
                                    <TableRow label="CreatedAt" value={`${new Date(product.createdAt).getDate()}/${new Date(product.createdAt).getMonth() + 1}/${new Date(product.createdAt).getFullYear()}`} />

                                </tbody>
                            </table>
                            <div className="text-center">
                                <Link to={"/product/all"}>
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

export default ProductDet