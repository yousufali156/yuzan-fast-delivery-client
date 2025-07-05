import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import useAuth from '../../../../Hooks/useAuth';

const Login = () => {
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const { signIn } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from || '/';



    const onSubmit = data => {
        signIn(data.email, data.password)
            .then(result =>{
                console.log(result.user);
                navigate(from);
            })
            .catch(error => console.log(error))
    };

    

    return (

        <div className='card-body'>
            <h1 className='text-4xl'>Please Login Your Account</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset className="fieldset">

                    <label className="label">Email</label>
                    <input
                        type="email"
                        {...register('email', {
                            required: "Email Address is required",
                        })}

                        className="input" placeholder="Email" />

                    {
                        errors.email?.type === 'required' && <p className='text-red-700'> Email is Required</p>
                    }
                    <label className="label">Password</label>
                    <input
                        type="password"
                        {...register('password', {
                            required: true,
                            minLength: 6,

                        })}
                        className="input" placeholder="Password" />
                    {
                        errors.password?.type === 'required' && <p className='text-red-700'> Password is Required</p>
                    }
                    {
                        errors.password?.type === 'minLength' && <p className='text-red-700'> Password must be 6 Characters Or Longer</p>
                    }

                    <div><a className="link link-hover">Forgot password?</a></div>
                </fieldset>
                <button className="btn btn-neutral mt-4">Login</button>

            </form>
            <SocialLogin></SocialLogin>
            <p className='mt-5 text-lg'>You have an Account <Link to='/register' className="link btn-link link-hover">Register </Link></p>

        </div>
    );
};

export default Login;