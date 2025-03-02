import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import parcel_icon from "../assets/admin_assets/parcel_icon.svg";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/order/all-orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log("All Orders Fetched Successfully", responseData.orders);
        setOrders(responseData.orders);
      } else {
        console.log("Failed to fetch orders:", responseData);
      }
    } catch (error) {
      console.log("Error fetching orders:", error);
    }
  };

  const statusHandler = async (orderID, newStatus) => {
    try {
      const response = await fetch("http://localhost:3000/api/order/update-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ orderID, status: newStatus }),
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log("Status Updated Successfully", responseData.status);
        fetchAllOrders(); // Refresh orders after status update
      } else {
        console.log("Failed to Update Status");
      }
    } catch (error) {
      console.log("Error updating status:", error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="orders-data">
      <div className="inline-flex gap-2 items-center mb-3">
        <p className="text-gray-500 text-3xl">
          MY <span className="text-gray-700 font-medium">ORDERS</span>
        </p>
        <div className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></div>
      </div>

      <div className="border p-2 gap-5 rounded-md shadow-lg flex flex-col items-center">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order._id} className="order-item p-5 rounded-lg  w-full flex flex-row gap-3">
              
              <div className="flex items-center gap-3 flex-col">
                <img src={parcel_icon} alt="Parcel" className="w-full h-ful" />
                <div className="order-details">
                  {order.items?.map((item, idx) => (
                    <span key={idx} className="block">
                      {item.name} x {item.quantity} <span>({item.size})</span>
                    </span>
                  ))}
                </div>
              </div>

                <p>
                <strong>Name:</strong> {order.address?.firstName} {order.address?.lastName}
                </p>
              <p>
                <strong>Street:</strong> {order.address?.street}
              </p>
              <p>
                <strong>Location:</strong> {order.address?.city}, {order.address?.state}
              </p>

              {/* Order Status Update Dropdown */}
              <OrderStatusForm orderId={order._id} currentStatus={order.status} updateOrderStatus={statusHandler} />
            </div>
          ))
        ) : (
          <p className="text-gray-500">No orders found.</p>
        )}
      </div>
    </div>
  );
};

// Separate Order Status Form with React Hook Form
const OrderStatusForm = ({ orderId, currentStatus, updateOrderStatus }) => {
  const { control, handleSubmit } = useForm({ defaultValues: { status: currentStatus } });

  return (
    <form onSubmit={handleSubmit((data) => updateOrderStatus(orderId, data.status))} className="flex flex-col items-center justify-center">
      <Controller
        name="status"
        control={control}
        render={({ field }) => (
          <select
            {...field}
            className="border-2 border-black outline-none p-2 rounded-md cursor-pointer mb-2"
          >
            <option value="Order Placed">Order Placed</option>
            <option value="Packing">Packing</option>
            <option value="Shipping">Shipping</option>
            <option value="Out For Delivery">Out For Delivery</option>
            <option value="Delivered">Delivered</option>
          </select>
        )}
      />
      <button type="submit" className=" bg-blue-500 text-white px-3 py-1 cursor-pointer w-full rounded">
        Update
      </button>
    </form>
  );
};

export default AllOrders;
