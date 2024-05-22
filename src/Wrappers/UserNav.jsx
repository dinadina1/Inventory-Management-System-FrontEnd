// import required packages
import { Link, Outlet } from 'react-router-dom'

const UserNav = ({ user, handleLogout }) => {

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">

        <div className="container-fluid">

          <Link to={"/"} className="navbar-brand">
          </Link>

          <div className="collapse navbar-collapse" id="navbarNav">

            <ul className="navbar-nav ms-md-auto gap-2">

              <li className="nav-item rounded">
                <Link to={"/"} className="nav-link active" aria-current="page"><i className="bi bi-house-fill me-2"></i>Home</Link>
              </li>

              <li className="nav-item dropdown rounded">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="bi bi-person-fill me-2"></i>Product</a>

                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                  <li ><Link to={"/product/register-product"} className="dropdown-item">Register new Product</Link></li>
                  <li ><Link to={"/product/all"} className="dropdown-item">All Product</Link></li>
                </ul>
              </li>

              <li className="nav-item dropdown rounded">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="bi bi-person-fill me-2"></i>Vendor</a>

                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                  <li ><Link to={"/vendor/register"} className="dropdown-item">Register new Vendor</Link></li>
                  <li ><Link to={"/vendor/all"} className="dropdown-item">All Vendors</Link></li>
                  <li ><Link to={"/vendor/statewise-all"} className="dropdown-item">All Vendors Statewise</Link></li>
                  <li ><Link to={"/vendor/citywise-all"} className="dropdown-item">All vendors Citywise</Link></li>

                </ul>
              </li>

              <li className="nav-item dropdown rounded">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="bi bi-person-fill me-2"></i>Purchase</a>

                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                  <li ><Link to={"/purchase/register"} className="dropdown-item">Register new Purchase</Link></li>
                  <li ><Link to={"/purchase/all"} className="dropdown-item">All Purchase order</Link></li>
                  <li ><Link to={"/purchase/datewise-all"} className="dropdown-item">All Purchase Datewise</Link></li>
                  <li ><Link to={"/purchase/stocks"} className="dropdown-item">All Stocks</Link></li>
                </ul>
              </li>

              <li className="nav-item dropdown rounded">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="bi bi-person-fill me-2"></i>Reports</a>

                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                  <li ><Link to={"/report/stocklevel"} className="dropdown-item">Stock Level Report</Link></li>
                  <li ><Link to={"/report/purchase-order"} className="dropdown-item">Purchase Order Report</Link></li>
                  <li ><Link to={"/report/turnover"} className="dropdown-item">Turn Over Report</Link></li>
                </ul>
              </li>

              <li className="nav-item dropdown rounded">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="bi bi-person-fill me-2"></i>{`${user.firstname} ${user.lastname}`}</a>

                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">

                  <li><Link to={"/user/profile"} className="dropdown-item" href="#">Account</Link></li>

                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li onClick={handleLogout}><Link className="dropdown-item" href='#'>Logout</Link></li>

                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Outlet />
    </>
  )
}

export default UserNav