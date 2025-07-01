import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../../Hooks/useAuth';
import { Link } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser } = useAuth();
    const onSubmit = data => {
        console.log(data);
        createUser(data.email, data.password)
            .then(result => {
                console.log(result.user)
            })
            .catch(error => {
                console.log(error);
            })
    }
    return (
        <div className='card-body'>
            <h1 className='text-4xl'>Create an Account</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset className="fieldset">
                    <label className="label">Full Name</label>
                    <input
                        className="input"
                        placeholder="Input Your Full Name"
                        type='name'
                        {...register("fullName", { required: true })}
                        aria-invalid={errors.fullName ? "true" : "false"}
                    />
                    {errors.fullName?.type === "required" && (
                        <p className='text-red-800' role="alert">Full name is required</p>
                    )}

                    <label className="label">Email</label>
                    <input
                        type="email"
                        {...register('email', { required: true, })}
                        className="input"
                        placeholder="Email" />
                    {
                        errors.email?.type === 'required' && <p>Email is Required</p>
                    }


                    <label className="label">Password</label>
                    <input
                        type="password"
                        {...register('password', {
                            required: true,
                            minLength: 6,
                            pattern: /^[A-Za-z]+$/i,
                        })}
                        className="input" placeholder="Password" />
                    {
                        errors.password?.type === 'required' && <p className='text-red-700'> Password is Required</p>
                    }
                    {
                        errors.password?.type === 'minLength' && <p className='text-red-700'> Password must be 6 Characters Or Longer</p>
                    }
                    {
                        errors.password?.type === 'pattern' && <p className='text-red-700'> Use One Capital Letter & Symble </p>
                    }

                </fieldset>
                <button className="btn btn-primary mt-4">Register</button>

            </form>
            <SocialLogin></SocialLogin>
            <p className='mt-5 text-lg'>You have an Account <Link to='/login' className="link btn-link link-hover">Login </Link></p>
        </div>
    );
};

export default Register;