import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
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
        userData,
    });

    const {
        handleSubmit,
        formState: { errors },
        reset,
        control,
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

    const [isVisible, setIsVisible] = React.useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    const onSubmit = (formData) => {
        navigate('/admin/users');
        reset();
        onOpenChange(false);

        if (isEditing) {
            updateUser({ userId: userData._id, updatedUser: formData });
        } else {
            addUser({ ...formData, account_type: 'user' });
        }
    };

    React.useEffect(() => {
        if (userData) {
            reset({
                ...userData,
                password: '',
            });
        }
    }, [userData, reset]);

    // Effect to set form data when userData prop changes
    React.useEffect(() => {
        if (isAddSuccess) {
            toast.success('User Added successfully');
            NProgress.done();
        }

        if (isAddError) {
            NProgress.done();
            const err = addError;
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
    }, [isAddLoading]);

    React.useEffect(() => {
        if (isUpdateSuccess) {
            NProgress.done();
            toast.success('User updated successfully');
        }

        if (isUpdateError) {
            NProgress.done();
            const err = updateError;
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
    }, [isUpdateLoading]);

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
                            {isEditing ? 'Update User' : 'Add User'}
                        </ModalHeader>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <ModalBody>
                                <div className='flex items-center gap-2'>
                                    <div>
                                        <Controller
                                            render={({ field }) => (
                                                <Input
                                                    autoFocus
                                                    endContent={
                                                        <MailIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />
                                                    }
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
                                                    endContent={
                                                        <MailIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />
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
                                                label='Username'
                                                placeholder='Enter Username'
                                                isInvalid={!!errors.username}
                                                errorMessage={
                                                    errors.username &&
                                                    errors.username?.message
                                                }
                                                endContent={
                                                    <MailIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />
                                                }
                                                {...field}
                                            />
                                        )}
                                        name='username'
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
                                <div>
                                    <Controller
                                        render={({ field }) => (
                                            <Select
                                                autoFocus
                                                variant='underlined'
                                                label='Select user role'
                                                placeholder='Select a role'
                                                className='w-full px-2'
                                                isInvalid={!!errors.role}
                                                errorMessage={
                                                    errors.role &&
                                                    errors.role?.message
                                                }
                                                {...field}
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
                                        )}
                                        name='role'
                                        control={control}
                                        rules={{ required: true }}
                                    />
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    className='border-gray-600 text-black'
                                    onPress={onClose}
                                >
                                    Close
                                </Button>
                                {isAddLoading || isUpdateLoading ? (
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
