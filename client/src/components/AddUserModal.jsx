import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
} from '@nextui-org/react';
import PropTypes from 'prop-types';
import { MailIcon } from '../icons/MailIcon';
import { LockIcon } from '../icons/LockIcon';

const AddUserModal = ({ isOpen, onOpenChange }) => {
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
                        <ModalBody>
                            <div className='flex items-center gap-2'>
                                <Input
                                    autoFocus
                                    endContent={
                                        <MailIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />
                                    }
                                    label='First Name'
                                    placeholder='Enter First Name'
                                    variant='bordered'
                                />
                                <Input
                                    autoFocus
                                    endContent={
                                        <MailIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />
                                    }
                                    label='Last Name'
                                    placeholder='Enter Last Name'
                                    variant='bordered'
                                />
                            </div>
                            <Input
                                autoFocus
                                endContent={
                                    <MailIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />
                                }
                                label='Email'
                                placeholder='Enter Email'
                                type='email'
                                variant='bordered'
                            />
                            <Input
                                endContent={
                                    <MailIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />
                                }
                                label='Username'
                                placeholder='Enter Username'
                                variant='bordered'
                            />
                            <Input
                                endContent={
                                    <LockIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />
                                }
                                label='Password'
                                placeholder='Enter Password'
                                type='password'
                                variant='bordered'
                            />
                            <div className='flex justify-center items-center gap-10'>
                                {/* <Checkbox defaultSelected color='secondary'>
                                    Admin
                                </Checkbox>
                                <Checkbox defaultSelected color='secondary'>
                                    Manager
                                </Checkbox> */}
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                className='bg-gray-300 text-black'
                                onPress={onClose}
                            >
                                Close
                            </Button>
                            <Button className='bg-black text-white'>
                                Add User
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default AddUserModal;

AddUserModal.propTypes = {
    isOpen: PropTypes.bool,
    onOpenChange: PropTypes.func,
};
