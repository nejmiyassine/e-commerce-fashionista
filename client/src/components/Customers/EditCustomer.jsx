import React from 'react';
import {
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    ModalFooter,
    Button,
} from '@nextui-org/react';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { updateCustomer } from '../../features/customers/customersSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {toast} from 'react-toastify'

const schema = yup.object({
    first_name: yup.string().required('First Name is required'),
    last_name: yup.string().required('Last Name is required'),
    email: yup.string().email().required('Email is required'),
    password: yup
        .string()
        .min(6, 'Password must have at least 6 characters')
        .max(10)
        .required(),
});

const EditCustomer = ({ isOpen, onOpenChange, updatedCustomer }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isEditing = !!updatedCustomer;
    const passwordInitialValue = isEditing ? '' : '';

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
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
        if (isEditing) {
            navigate('/admin/customers');
            onOpenChange(false);
            reset();

            console.log(updatedCustomer._id);
            dispatch(
                updateCustomer({
                    customerId: updatedCustomer._id,
                    updatedCustomerData: formData,
                })
            );
            toast.success('Updated successfully')
        }
    };

    React.useEffect(() => { 
        if (updatedCustomer) {
            reset({ ...updatedCustomer, password: passwordInitialValue });
        }
    }, [dispatch, updatedCustomer]);

    console.log('display edit')
    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement='top-center'
            backdrop='blur'
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className='flex flex-col  gap-1'>
                            Edit Customer
                        </ModalHeader>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <ModalBody>
                                <div className='flex flex-col gap-2'>
                                    <Input
                                        label='Customer ID'
                                        placeholder='Customer ID'
                                        isReadOnly
                                        variant='bordered'
                                        {...register('_id')}
                                        isDisabled
                                    />

                                    <div className='flex items-center gap-3'>
                                        <div className='flex-1'>
                                            <Input
                                                autoFocus
                                                label='First Name'
                                                placeholder='First Name'
                                                variant='bordered'
                                                {...register('first_name')}
                                            />
                                            <p className='text-red-500'>
                                                {errors.firstName?.message}
                                            </p>
                                        </div>

                                        <div className='flex-1'>
                                            <Input
                                                label='last Name'
                                                placeholder='LastName'
                                                type='text'
                                                variant='bordered'
                                                {...register('last_name')}
                                            />
                                            <p className='text-red-500'>
                                                {errors.lastName?.message}
                                            </p>
                                        </div>
                                    </div>

                                    <div>
                                        <Input
                                            label='email'
                                            placeholder='email'
                                            type='text'
                                            variant='bordered'
                                            {...register('email')}
                                        />
                                        <p className='text-red-500'>
                                            {errors.email?.message}
                                        </p>
                                    </div>

                                    <div>
                                        <Input
                                            label='Password'
                                            placeholder='password'
                                            type='password'
                                            variant='bordered'
                                            {...register('password')}
                                        />
                                        <p className='text-red-500'>
                                            {errors.password?.message}
                                        </p>
                                    </div>

                                    <Input
                                        label='creation date'
                                        placeholder='creattion Date'
                                        isReadOnly
                                        variant='bordered'
                                        {...register('creation_date')}
                                        isDisabled
                                    />

                                    <Input
                                        label='Last login date'
                                        placeholder='last login'
                                        isReadOnly
                                        variant='bordered'
                                        {...register('last_login')}
                                        isDisabled
                                    />

                                    <Input
                                        label='Valid Account'
                                        placeholder='Valid Account'
                                        isReadOnly
                                        variant='bordered'
                                        {...register('last_update')}
                                        isDisabled
                                    />
                                </div>
                            </ModalBody>

                            <ModalFooter>
                                <Button
                                    color='danger'
                                    variant='flat'
                                    onPress={onClose}
                                >
                                    Close
                                </Button>

                                <Button
                                    className='bg-blue-500'
                                    color='danger'
                                    type='submit'
                                >
                                    Update Customer
                                </Button>
                            </ModalFooter>
                        </form>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default EditCustomer;
