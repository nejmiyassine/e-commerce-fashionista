/* eslint-disable react/prop-types */
import { Controller } from 'react-hook-form';
import { Input } from '@nextui-org/react';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';

import { MailIcon } from '../../icons/Icons';

import 'react-phone-number-input/style.css';

const BillingDetailsFields = ({ errors, control }) => {
    return (
        <div className='flex flex-col gap-3'>
            <div className='flex flex-col md:flex-row gap-2'>
                <Controller
                    render={({ field }) => (
                        <Input
                            autoFocus
                            label='Country'
                            placeholder='Country'
                            variant='bordered'
                            {...field}
                            isInvalid={!!errors.country}
                            errorMessage={
                                errors.country && errors.country?.message
                            }
                        />
                    )}
                    name='country'
                    control={control}
                    rules={{ required: true }}
                />

                <Controller
                    render={({ field }) => (
                        <Input
                            autoFocus
                            label='First Name'
                            placeholder='First Name'
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
                            placeholder='Last Name'
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
            </div>

            <Controller
                render={({ field }) => (
                    <Input
                        autoFocus
                        endContent={
                            <MailIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />
                        }
                        label='Email Address'
                        placeholder='xyz@example.com'
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

            <div className=''>
                <p className='text-sm pb-2 pl-1'>Shipping Address</p>
                <div className='flex items-center flex-col md:flex-row gap-3'>
                    <Controller
                        render={({ field }) => (
                            <Input
                                autoFocus
                                label='Address'
                                placeholder='Address'
                                variant='bordered'
                                {...field}
                                isInvalid={!!errors.address}
                                errorMessage={
                                    errors.address && errors.address?.message
                                }
                            />
                        )}
                        name='address'
                        control={control}
                        rules={{ required: true }}
                    />

                    <Controller
                        render={({ field }) => (
                            <Input
                                autoFocus
                                label='City'
                                placeholder='City'
                                variant='bordered'
                                {...field}
                                isInvalid={!!errors.city}
                                errorMessage={
                                    errors.city && errors.city?.message
                                }
                            />
                        )}
                        name='city'
                        control={control}
                        rules={{ required: true }}
                    />

                    <Controller
                        render={({ field }) => (
                            <Input
                                autoFocus
                                endContent={
                                    <MailIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />
                                }
                                label='Postal Code'
                                placeholder='Postal Code'
                                variant='bordered'
                                {...field}
                                isInvalid={!!errors.email}
                                errorMessage={
                                    errors.email && errors.email?.message
                                }
                            />
                        )}
                        name='postal_code'
                        control={control}
                        rules={{ required: true }}
                    />
                </div>
            </div>

            <div className='mb-2 pl-1'>
                <p className='text-sm pb-2'>Phone Number</p>
                <Controller
                    render={({ field }) => (
                        <PhoneInput
                            className='border outline-none p-2 rounded-md border-2 placeholder:text-sm placeholder:text-gray-400 px-2'
                            placeholder='+212 6XXXXXXXX'
                            {...field}
                            id='phone'
                            defaultCountry='MA'
                        />
                    )}
                    rules={{
                        validate: (value) => isValidPhoneNumber(value),
                        required: true,
                    }}
                    name='phone'
                    control={control}
                />
                {errors['phone'] && (
                    <p className='text-error text-rose-500 text-sm mt-1'>
                        Phone Number is a required field
                    </p>
                )}
            </div>
        </div>
    );
};

export default BillingDetailsFields;
