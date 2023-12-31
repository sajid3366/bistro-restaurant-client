import { useEffect, useRef, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import SocialLogin from '../../components/SocialLogin/SocialLogin';

const Login = () => {
    const captchaRef = useRef(null);
    // console.log(captchaRef);
    const [disabled, setDisabled] = useState(true);
    const { logIn } = useAuth()

    const location = useLocation()
    const navigate = useNavigate()

    // console.log(location);
    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    

    const handleLogin = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        const user = { email, password }
        console.log(user);
        logIn(email, password)
            .then(result => {
                console.log(result.user);
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

    const handleValidateCaptcha = (e) => {
        const value = e.target.value;
        console.log(value);
        if (validateCaptcha(value)) {
            setDisabled(false)
        }
        else {
            setDisabled(true)
        }
    }
    return (
        <>
            <Helmet>
                <title>Bistro | Login</title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="w-1/3 text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card flex-shrink-0 w-2/3 max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="email" className="input input-bordered" required />
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
                            <div className="form-control">
                                <label className="label">
                                    <LoadCanvasTemplate />
                                </label>
                                <input onBlur={handleValidateCaptcha} type="text" ref={captchaRef} name="captcha" placeholder="type here" className="input input-bordered" />

                            </div>
                            <SocialLogin></SocialLogin>
                            <p>Do not have account <Link to="/signup">Signup</Link></p>
                            <div className="form-control mt-6">
                                <input disabled={false} type="submit" className="btn btn-outline" value="Login" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;