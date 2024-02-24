import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function MyOrder() {
  const [orderData, setOrderData] = useState({});

  const fetchMyOrder = async () => {
    try {
      const userEmail = localStorage.getItem("userEmail");
      const response = await fetch(
        "http://localhost:5000/api/myOrderData",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: userEmail }),
        }
      );
      const data = await response.json();
      setOrderData(data);
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container">
        {Object.keys(orderData).length !== 0 &&
          orderData.orderData &&
          orderData.orderData.order_data
            .slice(0)
            .reverse()
            .map((order, index) => (
              <div key={index}>
                {order.Order_date ? (
                  <div>
                    <div className="m-auto mt-5 date-container" style={{borderColor: "red"}}>
                      {order.Order_date}
                      {"  "}
                      ₹{order.reduce((total, item) => total + item.price, 0)}/-
                      
                    </div>
                    <hr />
                  </div>
                ) : (
                  <div className="row">
                    {order.map((item, i) => (
                      <div key={i} className="col-12 col-md-6 col-lg-3">
                        <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                          <div className="card-body">
                            <h5 className="card-title">{item.name}</h5>
                            <div className="container w-100 p-0" style={{ height: "38px" }}>
                              <span className="m-1">{item.qty}</span>
                              <span className="m-1">{item.size}</span>
                              <span className="m-1">{item.Order_date}</span>
                              <span className="d-inline ms-2 h-100 w-20 fs-5">
                                ₹{item.price}/-
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
      </div>
      <Footer />
    </div>
  );
}
