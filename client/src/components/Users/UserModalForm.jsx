import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Select,
    Input,
    Button,
    SelectItem,
} from '@nextui-org/react';
import { toast } from 'react-toastify';
import NProgress from 'nprogress';

import { EyeFilledIcon, EyeSlashFilledIcon, MailIcon } from '../../icons/Icons';
import {
    useAddUserMutation,
    useUpdateUserMutation,
} from '../../app/api/usersApi';

const userRole = [
    {
        label: 'Admin',
        value: 'admin',
    },
    {
        label: 'Manager',
        value: 'manager',
    },
];

const schema = yup
    .object({
        first_name: yup.string().required('Please enter a first name'),
        last_name: yup.string().required('Please enter a last name'),
        email: yup.string().email().required('Please enter a valid email'),
        username: yup
            .string()
            .required('Please enter username')
            .max(20, 'Username must have 20 characters maximum'),
        password: yup
            .string()
            .required('Please enter a password')
            .min(8, 'Password must have at least 8 characters')
            .max(32, 'Password must have 32 characters maximum'),
        role: yup.string().required().oneOf(['admin', 'manager']),
    })
    .required();

const UserModalForm = ({ isOpen, onOpenChange, userData }) => {
    const navigate = useNavigate();
    const isEditing = !!userData;

    const passwordInitialValue = isEditing ? '' : '';

    const methods = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            first_name: '',
            last_name: '',
            email: '',
            username: '',
            role: '',
            password: '',
        },
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = methods;

    const [
        addUser,
        {
            isLoading: isAddLoading,
            isError: isAddError,
            error: addError,
            isSuccess: isAddSuccess,
        },
    ] = useAddUserMutation();
    const [
        updateUser,
        {
            isLoading: isUpdateLoading,
            isError: isUpdateError,
            error: updateError,
            isSuccess: isUpdateSuccess,
        },
    ] = useUpdateUserMutation();

    const loading = isAddLoading || isUpdateLoading;

    const [isVisible, setIsVisible] = React.useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    const onSubmit = (formData) => {
        navigate('/users');
        reset();
        onOpenChange(false);

        if (isEditing) {
            updateUser({ userId: userData._id, updatedUser: formData });
        } else {
            addUser(formData);
        }
    };

    // Effect to set form data when userData prop changes
    React.useEffect(() => {
        if (userData) {
            reset({
                ...userData,
                password: passwordInitialValue,
            });
        }

        if (isAddSuccess) {
            toast.success('User Added successfully');
            NProgress.done();
        }

        if (isUpdateSuccess) {
            toast.success('User updated successfully');
            NProgress.done();
        }

        if (isUpdateError || isAddError) {
            NProgress.done();
            const err = addError || updateError;
            if (Array.isArray(err.data.error)) {
                err.data.error.forEach((el) =>
                    toast.error(el.message, {
                        position: 'top-right',
                    })
                );
            } else {
                const resMessage =
                    err.data.message ||
                    err.data.detail ||
                    err.message ||
                    err.toString();
                toast.error(resMessage, {
                    position: 'top-right',
                });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userData, reset, passwordInitialValue, isAddLoading, isUpdateLoading]);

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            backdrop='blur'
            placement='top-center'
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className='flex flex-col gap-1'>
                            Add User
                        </ModalHeader>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <ModalBody>
                                <div className='flex items-center gap-2'>
                                    <div>
                                        <Input
                                            autoFocus
                                            endContent={
                                                <MailIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />
                                            }
                                            name='first_name'
                                            label='First Name'
                                            aria-label='User First Name'
                                            placeholder='Enter First Name'
                                            variant='bordered'
                                            {...register('first_name')}
                                            isInvalid={!!errors.first_name}
                                            errorMessage={
                                                errors.first_name &&
                                                errors.first_name?.message
                                            }
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            endContent={
                                                <MailIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />
                                            }
                                            name='last_name'
                                            label='Last Name'
                                            aria-label='User Last Name'
                                            placeholder='Enter Last Name'
                                            variant='bordered'
                                            {...register('last_name')}
                                            isInvalid={!!errors.last_name}
                                            errorMessage={
                                                errors.last_name &&
                                                errors.last_name?.message
                                            }
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Input
                                        endContent={
                                            <MailIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />
                                        }
                                        name='email'
                                        label='Email'
                                        placeholder='Enter Email'
                                        aria-label='User Email Address'
                                        type='email'
                                        variant='bordered'
                                        {...register('email')}
                                        isInvalid={!!errors.email}
                                        errorMessage={
                                            errors.email &&
                                            errors.email?.message
                                        }
                                    />
                                </div>
                                <div>
                                    <Input
                                        endContent={
                                            <MailIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />
                                        }
                                        name='username'
                                        label='Username'
                                        aria-label='User Username'
                                        placeholder='Enter Username'
                                        variant='bordered'
                                        {...register('username')}
                                        isInvalid={!!errors.username}
                                        errorMessage={
                                            errors.username &&
                                            errors.username?.message
                                        }
                                    />
                                </div>
                                <div>
                                    <Input
                                        endContent={
                                            <button
                                                className='focus:outline-none'
                                                type='button'
                                                onClick={toggleVisibility}
                                            >
                                                {isVisible ? (
                                                    <EyeSlashFilledIcon className='text-2xl text-default-400 pointer-events-none' />
                                                ) : (
                                                    <EyeFilledIcon className='text-2xl text-default-400 pointer-events-none' />
                                                )}
                                            </button>
                                        }
                                        type={isVisible ? 'text' : 'password'}
                                        name='password'
                                        label='Password'
                                        aria-label='User Password'
                                        placeholder='Enter Password'
                                        variant='bordered'
                                        {...register('password')}
                                        isInvalid={!!errors.password}
                                        errorMessage={
                                            errors.password &&
                                            errors.password?.message
                                        }
                                    />
                                </div>
                                <div>
                                    <Select
                                        variant='underlined'
                                        name='role'
                                        label='Select user role'
                                        aria-label='User Role'
                                        placeholder='Select a role'
                                        className='w-full px-2'
                                        {...register('role')}
                                        isInvalid={!!errors.role}
                                        errorMessage={
                                            errors.role && errors.role?.message
                                        }
                                    >
                                        {userRole.map((role) => (
                                            <SelectItem
                                                key={role.value}
                                                value={role.value}
                                            >
                                                {role.label}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    className='border-gray-600 text-black'
                                    onPress={onClose}
                                >
                                    Close
                                </Button>
                                {loading ? (
                                    <Button
                                        className='bg-black text-white'
                                        isDisabled
                                    >
                                        Loading...
                                    </Button>
                                ) : (
                                    <Button
                                        className='bg-black text-white'
                                        type='submit'
                                    >
                                        {isEditing ? 'Update User' : 'Add User'}
                                    </Button>
                                )}
                            </ModalFooter>
                        </form>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default UserModalForm;

UserModalForm.propTypes = {
    isOpen: PropTypes.bool,
    onOpenChange: PropTypes.func,
    userData: PropTypes.object,
};
