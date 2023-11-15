import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCarts from "../../../hooks/useCarts";

const FoodCard = ({ item }) => {
    const { name, price, image, recipe, _id } = item;
    const { user } = useAuth();
    const navigate = useNavigate()
    const location = useLocation()
    const axiosSecure = useAxiosSecure();
    const [, refetch] = useCarts()

    const handleAddToCart = () => {
        if (user && user.email) {
            const cartItem = {
                menuId: _id,
                email: user.email,
                name,
                image,
                price
            }
            axiosSecure.post("/carts", cartItem)
                .then(res => {
                    console.log(res.data);
                    if (res.data.insertedId) {
                        Swal.fire({
                            title: "Success!",
                            text: "Food added to cart",
                            icon: "success"
                        });
                        // reload the cart 
                        refetch();
                    }
                })
        }
        else {
            Swal.fire({
                title: "You are not Logged in",
                text: "Want to order Food!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Login"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/login", { state: location.pathname })
                }
            });
        }
    }

    return (
        <div className=" rounded-md bg-slate-50">
            <figure><img src={image} className="w-full rounded-md" alt="order" /></figure>
            <p className="absolute bg-black -mt-[200px] ml-[250px] text-white px-4 py-2 ">${price}</p>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>

                <div className="card-actions justify-end">
                    <button onClick={handleAddToCart} className="btn btn-outline border-0 bg-gray-200  border-orange-500 border-b-2">Add To Cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;