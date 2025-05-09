import React, { useEffect, useState } from "react";
import axios from "axios";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/orders")
      .then(response => setOrders(response.data))
      .catch(error => console.error("Error fetching orders:", error));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold">Orders</h2>
      <ul className="list-disc pl-5">
        {orders.map(order => (
          <li key={order.id}>Client: {order.client_id}, Product: {order.product_id}, Quantity: {order.quantity}</li>
        ))}
      </ul>
    </div>
  );
}

export default Orders;
