import React, {useContext, useState, useEffect} from 'react';
import main_logo from "../assets/frontend_assets/logo.png";
import { Link, NavLink, useParams } from 'react-router-dom';
import search_icon from "../assets/frontend_assets/search_icon.png"
import profile_icon from "../assets/frontend_assets/profile_icon.png"
import cart_icon from "../assets/frontend_assets/cart_icon.png"
import menu_icon from "../assets/frontend_assets/menu_icon.png"
import { ShopContext } from '../contexts/ShopContext';

const Navbar = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const {cartCount,setCartCount, isAuthenticated ,username, setIsAuthenticated, backendURL} = useContext(ShopContext)
    // console.log(cartCount)
    // console.log(username)
    
    const {id} = useParams()

    const onMenuClick = () => {

        setIsMenuOpen((prev)=>!prev);

    };
    
    const handleLogout = async () => {
        
        try{
            const response = await fetch(`http://localhost:3000/api/user/logout`, {
                method: "POST", 
                credentials: "include",
            });
    
            const data = await response.json();
            console.log("Logout response:", data);
    
            if(response.ok){
                
                setIsAuthenticated(false);
                localStorage.removeItem("username")
            }
        } 
        
        catch(error){

            console.error("Error logging out:", error);
        }

    };

    useEffect(() => {
        
        const fetchCartCount = async (username) => {
            if (!isAuthenticated) return; // Fetch only if the user is logged in

            try{

                const response = await fetch(`${backendURL}/api/cart/get-cart-count`, {
                    method: "POST",
                    credentials: "include",
                    headers:{

                        'Content-Type': "application/json"
                    },
                    body: JSON.stringify({username})
                });

                const data = await response.json();
                if(response.ok){

                    setCartCount(data.cartCount);
                } 

                else{

                    console.error("Failed to fetch cart count:", data.error);
                }
            } 
            
            catch(error){

                console.error("Error fetching cart count:", error);
            }
        };

        fetchCartCount(username);
    }, [isAuthenticated, backendURL, setCartCount]);

    

    return (
        <div className="nav-bar  h-16 w-full flex items-center  justify-between ">
        
            <div className="left-section logo flex items-center justify-center gap-4">

                <img src={menu_icon} alt="Menu " className={`rotate-180 w-5 h-5 lg:w-8 lg:h-6 max-lg:block hidden`} onClick={()=>onMenuClick(true)} />
                
                <Link to="/"><img src={main_logo} alt="Logo" className="md:w-36 w-28 cursor-pointer" /></Link>
                {isMenuOpen && (
                    
                    <div className="absolute top-10 left-0 bg-white shadow-md rounded-md w-40 p-2 flex flex-col gap-2 z-50">
                        <NavLink to="/" className="hover:bg-gray-200 p-2 rounded" onClick={() => setIsMenuOpen(false)}>
                        Home
                        </NavLink>
                        <NavLink to="/collection" className="hover:bg-gray-200 p-2 rounded" onClick={() => setIsMenuOpen(false)}>
                        Collection
                        </NavLink>
                        <NavLink to="/about" className="hover:bg-gray-200 p-2 rounded" onClick={() => setIsMenuOpen(false)}>
                        About
                        </NavLink>
                        <NavLink to="/contact" className="hover:bg-gray-200 p-2 rounded" onClick={() => setIsMenuOpen(false)}>
                        Contact
                        </NavLink>
                        <NavLink to="/Orders" className="hover:bg-gray-200 p-2 rounded" onClick={() => setIsMenuOpen(false)}>
                        Orders
                        </NavLink>
                        <a href='http://localhost:5174/admin-login' target='_blank' rel="noopener noreferrer" className="hover:bg-gray-200 p-2 rounded" onClick={() => setIsMenuOpen(false)}>
                        Admin Panel
                        </a>
                    </div>
                )}

            </div>
            
            <div className="mid-section lg:flex hidden items-center justify-center gap-9   flex-row ">

                {
                    
                    ["/", "/collection", "/about", "/contact", "/orders"].map((path, index) => {
                        
                        const labels = ["HOME", "COLLECTION", "ABOUT", "CONTACT", "ORDERS" ];
                        
                        return (
                            <NavLink key={index} to={path} className="flex items-center justify-center gap-1 h-10 w-fit flex-col">
                                {({ isActive }) => (
                                    <p className="font-mono text-gray-800 text-md">{labels[index]}</p>
                                )}
                            </NavLink>
                        );
                        
                    })
                    
                }
                <a href="http://localhost:5174/admin-login" className='border-1 border-black rounded-2xl px-3 py-1'>Admin Panel</a>

            </div>

            <div className={`right-section flex items-center justify-center gap-5 flex-row `}>
                
                { isAuthenticated &&

                    <div className="logout w-fit bg-black rounded-sm px-2 py-1 cursor-pointer" onClick={()=>handleLogout()}>
                        
                        <span className='text-white'>Logout</span>
                        
                        
                    </div>

                }

                <div className="profile-icon cursor-pointer ">

                    <Link to="/login"><img src={profile_icon} alt="" className='max-sm:h-3 max-sm:w-3 h-5 w-5'/></Link>

                </div>
                <div className="cart-icon relative cursor-pointer">

                    <Link to={`/product/cart`}><img src={cart_icon} alt="" className='max-sm:h-3 max-sm:w-3 h-5 w-5'/></Link>
                    <p className='absolute right-[-5px] bottom-[-5px] w-4 h-4 text-center bg-black text-white rounded-4xl font-light text-xs'>{isAuthenticated? cartCount:"0"}</p>
                </div>

            </div>
        </div>
    );
};

export default Navbar;
