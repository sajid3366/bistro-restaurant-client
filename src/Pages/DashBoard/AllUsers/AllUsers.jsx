import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaTrash, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure()
    const { data: users = [], refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const result = await axiosSecure.get('/users')
            return result.data
        }
    })

    const handleMakeAdmin = user => {
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is an Admin Now`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch()
                }
            })

    }

    const handleDeleteUser = user => {
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

                axiosSecure.delete(`/users/${user._id}`)
                    .then(result => {
                        if (result.data.deletedCount > 0) {
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
                subHeading="How Many??"
                heading="Manage All Users"
            ></SectionTitle>
            <div>
                <h2 className="text3xl">Total Users : {users.length}</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, idx) => <tr key={user._id} className="bg-base-200">
                                <th>{idx + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    {user.role === 'admin' ? 'Admin' : <button onClick={() => handleMakeAdmin(user)} className="btn bg-orange-500  btn-lg text-white"><FaUsers className="text-2xl"></FaUsers></button>}
                                </td>
                                <td>
                                    <button onClick={() => handleDeleteUser(user)} className="btn btn-ghost btn-lg text-red-600"><FaTrash></FaTrash></button>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default AllUsers;