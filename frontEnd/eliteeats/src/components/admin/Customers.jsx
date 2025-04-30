import { useState, useEffect } from "react";
import Nav from "./Nav";
import axios from "axios";
import { API_BASE_URL } from "../../constants/api";
import "./Customers.css"

function Customers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/admin/users`)
      .then((response) => {
        console.log(response.data);
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);



  const handleAction = (action, user) => {
    console.log(action, user);

    if (action === "block") {
      const confirmed = window.confirm(
        "Are you sure you want to block the user?"
      );

      if (confirmed) {
        axios.patch(`${API_BASE_URL}/admin/users/${user}`).then((response) => {
          console.log(response.data.Message);
          alert(response.data.Message);
        }).catch((error)=>{
            console.log(error)
        });
      }
    } else if(action ==="unblock") {
      const confirmed = window.confirm(
        "Are you sure you want to unblock the user?"
      );

      if (confirmed) {
        axios
          .patch(`${API_BASE_URL}/admin/users/unblock/${user}`)
          .then((response) => {
            console.log(response.data.message);
            alert(response.data.message);
          }).catch((error)=>{
            console.log(error)
          });
      }
    }else {

        axios.get(`${API_BASE_URL}/admin/users/${user}`)
        .then((response)=>{
            console.log(response)
        })
        .catch((error)=>{
            console.log(error)
        })


    }

  
  };

  return (
    // <div>
    //   <h1>Customers page</h1>
    //   <table>
    //     <thead>
    //       <tr>
    //         <th>Name</th>
    //         <th>Email</th>
    //         <th>Phone</th>
    //         <th>Status</th>

    //         <th>Actions</th>
    //       </tr>
    //     </thead>

    //     <tbody>
    //       {users.map((customer) => (
    //         <tr key={customer._id}>
    //           <td>{customer.name}</td>
    //           <td>{customer.email}</td>
    //           <td>{customer.mobile}</td>
    //           <td>active</td>

    //           <td>
    //             <select
    //               onChange={(e) => handleAction(e.target.value, customer._id)}
    //             >
    //               <option value="">Select Action</option>
    //               <option value="block">Block User</option>
    //               <option value="unblock">Unblock User</option>
    //             </select>
    //           </td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    //   <Nav />
    // </div>
    <div className="customers-container">
      <Nav />
      
      <main className="main-content">
        <header className="content-header">
          <h1>Customer Management</h1>
          <div className="header-actions">
            <input 
              type="text" 
              placeholder="Search customers..." 
              className="search-input"
            />
            <button className="export-btn">Search</button>
          </div>
        </header>
        
        <div className="content-body">
          <div className="table-container">
            <table className="customers-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {users.map((customer) => (
                  <tr key={customer._id}>
                    <td data-label="Name">{customer.name}</td>
                    <td data-label="Email">{customer.email}</td>
                    <td data-label="Phone">{customer.mobile}</td>
                    <td data-label="Status">
                      <span className={`status-badge ${customer.status || 'active'}`}>
                        {customer.status || 'active'}
                      </span>
                    </td>
                    <td data-label="Actions">
                      <select
                        onChange={(e) => handleAction(e.target.value, customer._id)}
                        className="action-select"
                      >
                        <option value="">Select Action</option>
                        <option value="block">Block User</option>
                        <option value="unblock">Unblock User</option>
                        <option  value="details">View Details</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="table-footer">
            <div className="pagination-controls">
              <button className="pagination-btn">Previous</button>
              <span>Page 1 of 5</span>
              <button className="pagination-btn">Next</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Customers;
