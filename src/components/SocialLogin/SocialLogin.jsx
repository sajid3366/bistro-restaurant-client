import { FaGoogle } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const SocialLogin = () => {
    const { googleLogin } = useAuth();
    const location = useLocation()
    const navigate = useNavigate()
    const axiosPublic = useAxiosPublic()

    const handleGoogleLogin = () => {
        googleLogin()
            .then(result => {
                console.log("google user", result.user);
                const userInfo = {
                    email : result.user?.email,
                    name : result.user?.displayName

                }
                axiosPublic.post('/users', userInfo)
                .then(res =>{
                    console.log(res.data);
                })
                Swal.fire({
                    title: "Login Successful",
                    text: "You clicked the button!",
                    icon: "success"
                });
                navigate(location?.state ? location.state : '/')
            })
            .catch(err => {
                console.log(err);
            })
    }
    return (
        <div>
            <div className='text-center'>
                <div className='divider'></div>
                <button onClick={handleGoogleLogin} className='btn'><FaGoogle></FaGoogle>Google</button>
            </div>
        </div>
    );
};

export default SocialLogin;