/* eslint-disable react/prop-types */
import React from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Button, Input } from '@nextui-org/react';
import { patchCustomerData } from '../../features/customers/customersSlice';

const schema = yup.object({
    first_name: yup.string().required('First Name is required'),
    last_name: yup.string().required('Last Name is required'),
    email: yup.string().email().required('Email is required'),
    password: yup
        .string()
        .min(6, 'Password must have at least 6 characters')
        .max(10),
});

const UpdateCustomerComponent = ({ customer }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        handleSubmit,
        reset,
        formState: { errors },
        control,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
        },
    });

    const onSubmit = (formData) => {
        dispatch(
            patchCustomerData({
                customerId: customer._id,
                patchedCustomerData: formData,
            })
        );
        reset();
        navigate('/customer-profile');
        toast.success('Customer is updated successfully', {
            position: 'bottom-right',
        });
    };

    React.useEffect(() => {
        if (customer) {
            reset({ ...customer, password: '' });
        }
    }, [customer, reset]);

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='p-4 lg:py-20 bg-lime-50 rounded-xl flex items-center'
        >
            <div className='flex flex-col gap-5 container mx-auto text-black-800'>
                <Controller
                    render={({ field }) => (
                        <Input
                            autoFocus
                            label='First Name'
                            placeholder='Update First Name'
                            labelPlacement='outside'
                            variant='bordered'
                            {...field}
                            isInvalid={!!errors.first_name}
                            errorMessage={
                                errors.first_name && errors.first_name?.message
                            }
                        />
                    )}
                    name='first_name'
                    control={control}
                    rules={{ required: true }}
                />

                <Controller
                    render={({ field }) => (
                        <Input
                            autoFocus
                            label='Last Name'
                            placeholder='Update Last Name'
                            labelPlacement='outside'
                            variant='bordered'
                            {...field}
                            isInvalid={!!errors.last_name}
                            errorMessage={
                                errors.last_name && errors.last_name?.message
                            }
                        />
                    )}
                    name='last_name'
                    control={control}
                    rules={{ required: true }}
                />

                <Controller
                    render={({ field }) => (
                        <Input
                            isDisabled
                            autoFocus
                            label='Email'
                            placeholder='Update Email'
                            labelPlacement='outside'
                            variant='bordered'
                            {...field}
                            isInvalid={!!errors.email}
                            errorMessage={errors.email && errors.email?.message}
                        />
                    )}
                    name='email'
                    control={control}
                    rules={{ required: true }}
                />

                <Controller
                    render={({ field }) => (
                        <Input
                            autoFocus
                            label='Password'
                            placeholder='Update password'
                            labelPlacement='outside'
                            variant='bordered'
                            type='password'
                            {...field}
                            isInvalid={!!errors.password}
                            errorMessage={
                                errors.password && errors.password?.message
                            }
                        />
                    )}
                    name='password'
                    control={control}
                    rules={{ required: true }}
                />

                <Button
                    className='bg-black text-white font-semibold text-lg rounded-md my-4 w-32'
                    type='submit'
                >
                    Submit
                </Button>
            </div>
        </form>
    );
};

export default UpdateCustomerComponent;
