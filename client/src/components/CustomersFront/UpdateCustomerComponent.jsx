import React from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
} from '@nextui-org/react';
import { patchCustomerData } from '../../features/customers/customersSlice';

const schema = yup.object({
    first_name: yup.string().required('First Name is required'),
    last_name: yup.string().required('Last Name is required'),
    email: yup.string().email().required('Email is required'),
    password: yup
        .string()
        .min(6, 'Password must have at least 6 characters')
        .max(10)
});

const UpdateCustomerComponent = ({ customer }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { onOpenChange, isOpen, onOpen } = useDisclosure();

    const isEditing = !!customer;
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
        },
    });
    console.log('customer from update Customer component', customer);

    const onSubmit = (formData) => {
        
        if (isEditing) {
            reset();
            navigate('/landingPage')

            console.log(customer._id);
            dispatch(
                patchCustomerData({
                     customerId: customer._id,
                    patchedCustomerData: formData,
                })
            );
            toast.success('Customer is updated successfully');
        }
    };

    React.useEffect(() => {
        if (customer) {
            reset({ ...customer });
        }
    }, [customer]);
    return (
        <>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className='  top-[100px] left-[380px] absolute p-4 bg-lime-50  rounded-xl'
            >
                <div className='flex flex-col gap-5 text-black-800 w-[700px] '>
                    <div>
                        <div>Customer ID</div>
                        <input
                            className='border-black border-1 rounded-md w-[700px] '
                            placeholder='Customer ID'
                            variant='bordered'
                            {...register('_id')}
                            disabled
                        />
                    </div>

                    <div>
                        <div>First Name</div>
                        <input
                            className='border-black border-1 rounded-md w-[700px]'
                            placeholder='First Name'
                            variant='bordered'
                            {...register('first_name')}
                        />
                        <p className='text-red-500'>
                            {errors.firstName?.message}
                        </p>
                    </div>

                    <div className='flex-1'>
                        <div>Last Name</div>
                        <input
                            className='border-black border-1 rounded-md w-[700px]'
                            placeholder='LastName'
                            type='text'
                            variant='bordered'
                            {...register('last_name')}
                        />
                        <p className='text-red-500'>
                            {errors.lastName?.message}
                        </p>
                    </div>

                    <div>
                        <div>Email</div>
                        <input
                            className='border-black border-1 rounded-md w-[700px]'
                            placeholder='email'
                            type='text'
                            variant='bordered'
                            {...register('email')}
                        />

                        <div></div>
                        <p className='text-red-500'>{errors.email?.message}</p>
                        {/* </div> */}

                        {/* <div> */}
                        <div>Password</div>
                        <input
                            className='border-black border-1 rounded-md w-[700px]'
                            placeholder='password'
                            type='password'
                            variant='bordered'

                             {...register('password')}
                        />

                        <div>
                            {/*
                             <Button
                                className='bg-transparent text-blue-500 border-none p-0'
                                onPress={onOpen}
                            >
                                Change Password
                            </Button>

                            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                                <ModalContent>
                                    {(onOpen) => (
                                        <>
                                            <ModalHeader className='flex flex-col gap-1'>
                                                Changing Password
                                            </ModalHeader>
                                            <ModalBody>
                                                <label>
                                                    Enter your current password
                                                </label>
                                                <input
                                                    type='text'
                                                    className='border-black border-1 rounded-md '
                                                />
                                                <label>
                                                    Enter your new password
                                                </label>
                                                <input
                                                    className='border-black border-1 rounded-md '
                                                    type='password'
                                                    {...register('password')}
                                                />
                                            </ModalBody>
                                            <ModalFooter>
                                                <Button
                                                    color='danger'
                                                    variant='light'
                                                    onPress={onOpen}
                                                >
                                                    Close
                                                </Button>
                                                <Button
                                                    className='bg-blue-500'
                                                    onPress={onOpen}
                                                >
                                                    Edit
                                                </Button>
                                            </ModalFooter>
                                        </>
                                    )}
                                </ModalContent>
                            </Modal>  */}
                        </div>

                        <p className='text-red-500'>
                            {errors.password?.message}
                        </p>
                        {/* </div> */}

                        {/* <div> */}
                        <div>Creation Date</div>
                        <input
                            className='border-black border-1 rounded-md w-[700px]'
                            placeholder='creation Date'
                            variant='bordered'
                            {...register('creation_date')}
                            disabled
                        />
                    </div>

                    <div>
                        <div>Last Login</div>
                        <input
                            className='border-black border-1 rounded-md w-[700px]'
                            placeholder='last login'
                            variant='bordered'
                            {...register('last_login')}
                            disabled
                        />
                    </div>

                    <div>
                        <div>Valid Account</div>
                        <input
                            className='border-black border-1 rounded-md w-[700px]'
                            placeholder='Valid Account'
                            variant='bordered'
                            {...register('valid_account')}
                            disabled
                        />
                    </div>
                    <input
                        className='bg-blue-500  text-white text-lg rounded-md my-4 w-[700px]'
                        type='submit'
                        value='Submit'
                    />
                </div>
            </form>
           
        </>
    );
};

export default UpdateCustomerComponent;
