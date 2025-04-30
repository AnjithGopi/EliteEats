
import { Link } from "react-router-dom"
import "./Nav.css"

function Nav() {
  return (

    <nav className="sidebar">
    <h1 className="sidebar-title">Admin Panel</h1>
    <ul className="sidebar-links">
      <li>
        <Link to="/dashboard" className="sidebar-link">
          Dashboard
        </Link>
      </li>
      <li>
        <Link to="/customers" className="sidebar-link">
          Customers
        </Link>
      </li>
      <li>
        <Link to="/restaurents" className="sidebar-link">
          Restaurants
        </Link>
      </li>
      <li>
        <Link to="/delivery_partners" className="sidebar-link">
          Delivery Partners
        </Link>
      </li>
    </ul>
  </nav>
    
  )
}

export default Nav
