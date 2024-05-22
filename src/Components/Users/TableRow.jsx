
const TableRow = ({ label, value }) => {
  return (
    <>
      <tr>
        <td scope="row" className='fw-bold'>{label}</td>
        <td>{value}</td>
      </tr>
    </>
  )
}

export default TableRow