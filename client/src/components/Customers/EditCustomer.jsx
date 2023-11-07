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


const schema = yup.object({
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    email: yup.string().email().required('Email is required'),
    password: yup.string().min(6 , 'Password must have at least 6 characters').max(10).required(),
});

const EditCustomer = ({ isOpen, onOpenChange }) => {
    
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        },
    });

    const onSubmit = (data) => {
        onOpenChange(false);
        console.log('data', data);
    };


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
                                    autoFocus
                                    label='Customer ID'
                                    placeholder='customerID'
                                    isReadOnly
                                    variant='bordered'
                                />

                                <div>
                                    <Input
                                        autoFocus
                                        label='First Name'
                                        placeholder='First Name'
                                        variant='bordered'
                                        {...register('firstName')}
                                    />
                                    <p className ='text-red-500'>{errors.firstName?.message}</p>
                                </div>

                                <div>
                                    <Input
                                        label='last Name'
                                        placeholder='LastName'
                                        type='text'
                                        variant='bordered'
                                        {...register('lastName')}
                                    />
                                    <p className ='text-red-500'>{errors.lastName?.message}</p>
                                </div>

                                <div>
                                    <Input
                                        label='Password'
                                        placeholder='password'
                                        type='password'
                                        variant='bordered'
                                        {...register('password')}
                                    />
                                    <p className ='text-red-500'>{errors.password?.message}</p>
                                </div>

                                <div>
                                    <Input
                                        label='email'
                                        placeholder='email'
                                        type='text'
                                        variant='bordered'
                                        {...register('email')}
                                    />
                                    <p className ='text-red-500'>{errors.email?.message}</p>
                                </div>

                                <Input
                                    label='creation date'
                                    placeholder='creattion Date'
                                    isReadOnly
                                    variant='bordered'
                                />

                                <Input
                                    label='Last login date'
                                    placeholder='last login'
                                    isReadOnly
                                    variant='bordered'
                                />

                                <Input
                                    label='Valid Account'
                                    placeholder='Valid Account'
                                    isReadOnly
                                    variant='bordered'
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

                                <Button color='primary' type='submit' >
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
