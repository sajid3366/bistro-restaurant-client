import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useCarts = () => {
    const axiosSecure = useAxiosSecure();
    const {user }= useAuth();
    // tan stack query
    const {refetch, data: carts = [] } = useQuery({
        queryKey: ['cart', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/carts?email=${user.email}`)
            return res.data
        }
    })

    return [carts, refetch]
};

export default useCarts;