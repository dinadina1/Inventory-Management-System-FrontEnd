
const StockTableRow = ({ stock, SNO }) => {
    return (
        <tr>
            <td>{SNO}</td>
            <td>{stock.productItem}</td>
            <td>{stock.quantity.toLocaleString()}</td>
            <td>{stock.unitPrice.toLocaleString()}</td>
            <td>{stock.totalPrice.toLocaleString()}</td>
            <td>{stock.location}</td>
        </tr>
    )
}

export default StockTableRow