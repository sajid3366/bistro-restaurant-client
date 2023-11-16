import { Helmet } from "react-helmet";
import { FaAd, FaBook, FaCalendar, FaEnvelope, FaHome, FaList, FaShoppingCart, FaUsers, FaUtensils } from "react-icons/fa";
import { FaAlignJustify } from "react-icons/fa6";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {
    const [isAdmin] = useAdmin();

    return (
        <div className="flex">
            <Helmet>
                <title>Bistro | Dashboard</title>
            </Helmet>
            <div className="w-64 min-h-screen bg-orange-400 ">
                <ul className="menu">
                    {
                        isAdmin ? <div>
                            <li><NavLink to="/dashboard/adminHome"><FaHome></FaHome>Admin Home</NavLink></li>
                            <li><NavLink to="/dashboard/addItem"><FaUtensils></FaUtensils>Add Item</NavLink></li>
                            <li><NavLink to="/dashboard/manageItem"><FaAd></FaAd>Manage Item</NavLink></li>
                            <li><NavLink to="/dashboard/manageBookings"><FaBook></FaBook>Manage Bookings</NavLink></li>
                            <li><NavLink to="/dashboard/allUsers"><FaUsers></FaUsers>All Users</NavLink></li>
                        </div> : <div>
                            <li><NavLink to="/dashboard/userHome"><FaHome></FaHome>User Home</NavLink></li>
                            <li><NavLink to="/dashboard/reservation"><FaCalendar></FaCalendar>Reservation</NavLink></li>
                            <li><NavLink to="/dashboard/review"><FaAd></FaAd>Add a Review</NavLink></li>
                            <li><NavLink to="/dashboard/cart"><FaShoppingCart></FaShoppingCart>My Cart</NavLink></li>
                            <li><NavLink to="/dashboard/bookings"><FaList></FaList>My Bookings</NavLink></li>
                        </div>

                    }

                    <div className="divider"></div>
                    <li><NavLink to="/"><FaHome></FaHome>Home</NavLink></li>
                    <li><NavLink to="/order/salad"><FaAlignJustify></FaAlignJustify>Menu</NavLink></li>
                    <li><NavLink to="/order/contact"><FaEnvelope></FaEnvelope>Contact</NavLink></li>

                </ul>
            </div>
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;