import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Signup = () => {

    const navigate = useNavigate()
    const { creatUser, updateUserProfile, logOut } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();

    const handleSuignup = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const photo = form.photo.value;
        const user = { name, photo, email, password }
        console.log(user);
        creatUser(email, password)
            .then(result => {
                console.log(result.user);
                const userInfo = {
                    name: name,
                    email: email
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        if (res.data.insertedId) {
                            console.log("user added to database");
                            Swal.fire({
                                title: "Good job!",
                                text: "You clicked the button!",
                                icon: "success"
                            });
                            updateUserProfile(name, photo);
                            logOut()
                                .then(() => {
                                    navigate("/login")
                                })
                        }
                    })

            })
            .catch(err => {
                console.log(err);
            })

    }
    return (
        <>
            <Helmet>
                <title>Bistro | SignUp</title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="w-1/3 text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Sign Up now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card flex-shrink-0 w-2/3 max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSuignup} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" name="name" placeholder="Name" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input type="text" name="photo" placeholder="Photo URL" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="Email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <p>Have a account <Link to="/login">Login</Link></p>

                            <div className="form-control mt-6">
                                <input type="submit" className="btn btn-outline" value="SignUp" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Signup;