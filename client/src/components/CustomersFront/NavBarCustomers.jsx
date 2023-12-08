import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
    Navbar,
    NavbarContent,
    DropdownItem,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    Avatar,
    Button,
} from '@nextui-org/react';
import { logOutCustomer } from '../../features/customers/customersSlice';
import { useGetCustomerProfileDataQuery } from '../../app/api/customerApi';
import LoadingSpinner from '../LoadingSpinner';

const NavbarCustomers = () => {
    const navigate = useNavigate();

    const {
        data: customer,
        isLoading,
        isFetching,
        isError,
        error,
    } = useGetCustomerProfileDataQuery();

    const loading = isLoading || isFetching;

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!isLoading && isError) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className=' shadow-md  border-black'>
            <Navbar>
                <NavbarContent as='div' justify='end'>
                    <div className='flex justify-center '>
                        <ul className='flex justify-around w-80 relative right-80     '>
                            <li>
                                <Button
                                    className='bg-color-none '
                                    onClick={() => {
                                        navigate('/landingPage');
                                    }}
                                >
                                    Home
                                </Button>
                            </li>
                            <li>
                                <Button
                                    className='bg-color-none '
                                    onClick={() => {
                                        navigate('/customersOrders');
                                    }}
                                >
                                    Orders
                                </Button>
                            </li>
                            <li>
                                <Button
                                    className='bg-color-none '
                                    onClick={() => {
                                        navigate('/customersFavorites');
                                    }}
                                >
                                    Favorites
                                </Button>
                            </li>
                        </ul>
                    </div>

                    <Dropdown placement='bottom-end'>
                        <DropdownTrigger>
                            <Button variant='light'>
                                <Avatar
                                    isBordered
                                    as='button'
                                    className='transition-transform'
                                    color='secondaryColor'
                                    name='Jason Hughes'
                                    size='sm'
                                    src='https://i.pravatar.cc/150?u=a042581f4e29026704d'
                                />
                                <span>{customer.first_name}</span>
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            aria-label='Profile Actions'
                            variant='flat'
                        >
                            <DropdownItem
                                key='settings'
                                className='h-8'
                                onClick={() => {
                                    navigate(`/updateProfile/${customer._id}`);
                                }}
                            >
                                Profile
                            </DropdownItem>

                            <DropdownItem
                                key='logout'
                                color='danger'
                                className='h-8'
                                onClick={() => {
                                    dispatch(logOutCustomer());
                                    navigate('/login');
                                }}
                            >
                                Log out
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </NavbarContent>
            </Navbar>
        </div>
    );
};

export default NavbarCustomers;
