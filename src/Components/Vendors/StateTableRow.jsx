
const StateTableRow = ({ vendor, SNO }) => {
  return (
    <tr>
      <td>{SNO}</td>
      <td>{vendor.ownerName}</td>
      <td>{vendor.companyName}</td>
      <td>{vendor.email}</td>
      <td>{vendor.phoneNo}</td>
      <td>{vendor.gstNumber}</td>
      <td>{`${vendor.address.street}, ${vendor.address.city}, ${vendor.address.state}, ${vendor.address.country}, ${vendor.address.pincode}`}</td>
    </tr>
  )
}

export default StateTableRow