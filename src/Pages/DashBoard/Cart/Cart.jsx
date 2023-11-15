import { FaTrash } from "react-icons/fa";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useCarts from "../../../hooks/useCarts";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Cart = () => {
    const [cart, refetch] = useCarts();
    const axiosSecure = useAxiosSecure();

    const totalPrice = cart.reduce((total, item) => {
        return total + item.price
    }, 0)

    const handleDelete = id => {
        console.log(id);
        Swal.fire({
            title: "Are You Sure!",
            text: "You won't revert this",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete "
        }).then((result) => {
            if (result.isConfirmed) {


                axiosSecure.delete(`/carts/${id}`)
                    .then(result => {
                        if (result.data.deletedCount>0) {
                            Swal.fire({
                                title: "Deleted",
                                text: "Your file has been deleted",
                                icon: "success"
                            });
                            refetch();
                        }
                    })


            }
        });
    }
    return (
        <div>
            <SectionTitle
                subHeading="Hello Vai"
                heading="Wanna Add More"
            ></SectionTitle>
            <div className="flex justify-around mb-5">
                <h2 className="text-4xl">Items : {cart.length}</h2>
                <h2 className="text-4xl">Total Price : {totalPrice}</h2>
                <button className="btn btn-primary">Pay</button>
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="text-orange-500 text-lg font-bold uppercase">
                            <th>#</th>
                            <th>Item Image</th>
                            <th>Item Name</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cart.map((item, idx) => <tr key={item._id}>
                                <th>
                                    {idx + 1}
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>

                                    </div>
                                </td>
                                <td>
                                    {item.name}
                                </td>
                                <td>{item.price}</td>
                                <th>
                                    <button onClick={() => handleDelete(item._id)} className="btn btn-ghost btn-lg text-red-600"><FaTrash></FaTrash></button>
                                </th>
                            </tr>)
                        }


                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default Cart;