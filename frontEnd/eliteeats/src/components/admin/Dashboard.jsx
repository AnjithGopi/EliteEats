
import Nav from "./Nav"

import "./Dashboard.css"

function Dashboard() {
  return (
    // <div>
    //     <h1>Admin dashboard</h1>
    //     <Nav/>

        
      
    // </div>

    <div className="dashboard-container">
      <Nav />
      
      <main className="main-content">
        <header className="content-header">
          <h1> Dashboard</h1>
        </header>
        
        <div className="content-body">
          <div className="stats-container">
            <div className="stat-card">
              <h3>Total Customers</h3>
              <p>1,248</p>
            </div>
            <div className="stat-card">
              <h3>Total Restaurants</h3>
              <p>356</p>
            </div>
            <div className="stat-card">
              <h3>Active Delivery Partners</h3>
              <p>189</p>
            </div>
            <div className="stat-card">
              <h3>Today's Orders</h3>
              <p>84</p>
            </div>
          </div>
          
          
        </div>
      </main>
    </div>
  )
}

export default Dashboard
