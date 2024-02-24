import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import { useCart } from "./ContextReducer";
import Modal from '../Modal';
import Cart from '../screens/Cart';
export default function Navbar(props) {
 const [cartView,setCartView]=useState(false);
 let data= useCart();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate("/login");
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <Link className="navbar-brand fs-1 fst-italic ms-3 me-auto" to="/">
          GoFood
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="/navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <ul className="navbar-nav me-auto mb-2">
            <li className="nav-item">
              <Link className="nav-item nav-link active fs-5 ms-3" to="/">
                Home <span className="sr-only"></span>
              </Link>
            </li>

            {localStorage.getItem("authToken") && (
              <li className="nav-item">
                <Link className="nav-item nav-link active fs-5" to="/MyOrder">
                  My Orders <span className="sr-only"></span>
                </Link>
              </li>
            )}
          </ul>
          {localStorage.getItem("authToken") ? (
            <div className="d-flex">
              <div className="btn bg-white text-success mx-2" onClick={()=>{
                setCartView(true);
              }}>
                My Cart{" "}
                <Badge pill bg="danger">{data.length}</Badge>
                </div>
                {cartView?<Modal onClose={()=>setCartView(false)}><Cart/></Modal>:null}
              <div className="btn bg-white text-danger me-3" onClick={handleLogout}>Logout</div>
            </div>
          ) : (
            <div className="d-flex">
              <Link className="nav-link btn bg-white text-success mx-1" to="/Login">
                Login
              </Link>
              <Link className="nav-link btn bg-white text-success mx-1" to="/createuser">
                SignUp
              </Link>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
