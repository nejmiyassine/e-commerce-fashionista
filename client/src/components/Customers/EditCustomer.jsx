/* eslint-disable react/prop-types */
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

import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { updateCustomer } from '../../features/customers/customersSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import { EyeFilledIcon, EyeSlashFilledIcon, MailIcon } from '../../icons/Icons';

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

    const [isVisible, setIsVisible] = React.useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    const {
        handleSubmit,
        formState: { errors },
        reset,
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
            toast.success('Customer is updated successfully');
        }
    };

    React.useEffect(() => {
        if (updatedCustomer) {
            reset({ ...updatedCustomer, password: passwordInitialValue });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, updatedCustomer]);

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
                                    <div>
                                        <Controller
                                            render={({ field }) => (
                                                <Input
                                                    autoFocus
                                                    label='First Name'
                                                    placeholder='Enter First Name'
                                                    variant='bordered'
                                                    {...field}
                                                    isInvalid={
                                                        !!errors.first_name
                                                    }
                                                    errorMessage={
                                                        errors.first_name &&
                                                        errors.first_name
                                                            ?.message
                                                    }
                                                />
                                            )}
                                            name='first_name'
                                            control={control}
                                            rules={{ required: true }}
                                        />
                                    </div>
                                    <div>
                                        <Controller
                                            render={({ field }) => (
                                                <Input
                                                    autoFocus
                                                    label='Last Name'
                                                    placeholder='Enter Last Name'
                                                    variant='bordered'
                                                    {...field}
                                                    isInvalid={
                                                        !!errors.last_name
                                                    }
                                                    errorMessage={
                                                        errors.last_name &&
                                                        errors.last_name
                                                            ?.message
                                                    }
                                                />
                                            )}
                                            name='last_name'
                                            control={control}
                                            rules={{ required: true }}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Controller
                                        render={({ field }) => (
                                            <Input
                                                autoFocus
                                                variant='bordered'
                                                label='Email'
                                                placeholder='Enter Email'
                                                type='email'
                                                isInvalid={!!errors.email}
                                                errorMessage={
                                                    errors.email &&
                                                    errors.email?.message
                                                }
                                                endContent={
                                                    <MailIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />
                                                }
                                                {...field}
                                            />
                                        )}
                                        name='email'
                                        control={control}
                                        rules={{ required: true }}
                                    />
                                </div>
                                <div>
                                    <Controller
                                        render={({ field }) => (
                                            <Input
                                                autoFocus
                                                variant='bordered'
                                                label='Password'
                                                placeholder='Enter Password'
                                                isInvalid={!!errors.password}
                                                errorMessage={
                                                    errors.password &&
                                                    errors.password?.message
                                                }
                                                endContent={
                                                    <button
                                                        className='focus:outline-none'
                                                        type='button'
                                                        onClick={
                                                            toggleVisibility
                                                        }
                                                    >
                                                        {isVisible ? (
                                                            <EyeSlashFilledIcon className='text-2xl text-default-400 pointer-events-none' />
                                                        ) : (
                                                            <EyeFilledIcon className='text-2xl text-default-400 pointer-events-none' />
                                                        )}
                                                    </button>
                                                }
                                                type={
                                                    isVisible
                                                        ? 'text'
                                                        : 'password'
                                                }
                                                {...field}
                                            />
                                        )}
                                        name='password'
                                        control={control}
                                        rules={{ required: true }}
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
