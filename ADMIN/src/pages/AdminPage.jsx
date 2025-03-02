import React, { useContext } from 'react';
import ProductUpload from '../components/ProductUpload';
import AdminNavBar from '../components/AdminNavBar';
import AdminSideBar from '../components/AdminSideBar';
import { AdminContext } from '../contexts/AdminContext.jsx';
import ItemsList from '../components/ItemsList';
import AllOrders from '../components/AllOrders';
import AdminLogin from '../components/AdminLogin';

const AdminPage = () => {
    const { activeTab, isAuthenticated } = useContext(AdminContext);
    console.log(isAuthenticated)
    return (
        <>
            {
                isAuthenticated ?(
                    <div className='flex w-full flex-col'>
                        <AdminNavBar />
                        <div className='flex w-full flex-row'>
                            <AdminSideBar />
                            
                            {/* Dynamic Component Rendering */}
                            {activeTab === "addItems" && <ProductUpload />}
                            {activeTab === "listItems" && <ItemsList />}
                            {activeTab === "orders" && <p><AllOrders/></p>}
                        </div>
                    </div>
                ): (

                    <AdminLogin/>
                )
            }
        </>
    );
};

export default AdminPage;
