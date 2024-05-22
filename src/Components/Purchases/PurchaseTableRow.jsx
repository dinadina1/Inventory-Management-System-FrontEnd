
const PurchaseTableRow = ({ purchase, SNO }) => {

    // Get the date from the purchase object
    const orderDate = new Date(purchase.orderDate);
    const deliveryDate = new Date(purchase.deliveryDate);

    return (
        <>
            <tr>
                <td>{SNO}</td>
                <td>{orderDate.toLocaleDateString()}</td>
                <td>{purchase.purchaseOrderNo}</td>
                <td>{purchase.productItem}</td>
                <td>{purchase.description}</td>
                <td>{purchase.quantity.toLocaleString()}</td>
                <td>{purchase.unitPrice.toLocaleString()}</td>
                <td>{purchase.totalPrice.toLocaleString()}</td>
                <td>{purchase.invoiceNo.toLocaleString()}</td>
                <td>{deliveryDate.toLocaleDateString()}</td>
                <td>{purchase.vendor.companyName}</td>
                <td>{purchase.location}</td>
                <td>{purchase.deliveryStatus}</td>
                <td>{purchase.paymentStatus}</td>
                <td>{`${purchase.createdBy.firstname} ${purchase.createdBy.lastname}`}</td>
            </tr>
        </>
    )
}

export default PurchaseTableRow