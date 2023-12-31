import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import useCarts from "../../../hooks/useCarts";
import useAuth from "../../../hooks/useAuth";
import useAdmin from "../../../hooks/useAdmin";

const Navbar = () => {

    const { user, logOut } = useAuth();
    const [isAdmin] = useAdmin()
    const [cart] = useCarts();
    const handleLogout = () => {
        logOut()
            .then(() => { })
            .catch(err => console.log(err))
    }

    const navLinks = <>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/menu">Menu</Link></li>
        <li><Link to="/order/salad">Oeder Food</Link></li>
        {
            user && isAdmin &&<li><Link to="/dashboard/adminHome">Dashboard</Link></li>

        }
        {
            user && !isAdmin &&<li><Link to="/dashboard/userHome">Dashboard</Link></li>

        }
        <li>
            <Link to="/dashboard/cart">
                <button className="btn">
                    <FaShoppingCart />
                    <div className="badge">+{cart.length}</div>
                </button>
            </Link>
        </li>
        {
            user ? <>

                <button onClick={handleLogout} className="btn text-white btn-outline">Logout</button>
                {/* <p>{user.displayName}</p> */}
            </>
                : <>
                    <li><Link to="/login">Login</Link></li>

                </>
        }
    </>
    return (
        <div className="navbar fixed z-10 opacity-50 max-w-7xl text-white bg-black">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navLinks}
                    </ul>
                </div>
                <a className="btn btn-ghost normal-case text-xl">Bistro Boss</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navLinks}
                </ul>
            </div>
            <div className="navbar-end">
                <a className="btn">Button</a>
            </div>
        </div>
    );
};

export default Navbar;