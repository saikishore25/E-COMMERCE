import React, { useContext } from 'react';
import add_icon from "../assets/admin_assets/add_icon.png";
import order_icon from "../assets/admin_assets/order_icon.png";
import { AdminContext } from '../contexts/AdminContext';

const AdminSideBar = () => {
    const { activeTab, setActiveTab } = useContext(AdminContext);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="flex flex-col items-center justify-start w-[30%] border-r-2 mr-3 py-4 gap-5 border-gray-400">
            <div className='flex flex-row items-center justify-between border-2 rounded-sm p-3 border-gray-400 w-[50%] mt-5 cursor-pointer'
                 onClick={() => handleTabChange("addItems")}>
                <img src={add_icon} alt="" />
                <button className='text-gray-700 font-semibold'>Add Items</button>
            </div>

            <div className='flex flex-row items-center justify-between border-2 rounded-sm p-3 border-gray-400 w-[50%] cursor-pointer'
                 onClick={() => handleTabChange("listItems")}>
                <img src={add_icon} alt="" />
                <p className='text-gray-700 font-semibold'>List Items</p>
            </div>

            <div className='flex flex-row items-center justify-between border-2 rounded-sm p-3 border-gray-400 w-[50%] cursor-pointer'
                 onClick={() => handleTabChange("orders")}>
                <img src={order_icon} alt="" />
                <p className='text-gray-700 font-semibold'>Orders</p>
            </div>
        </div>
    );
};

export default AdminSideBar;
