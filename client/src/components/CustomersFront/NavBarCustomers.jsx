import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { toast } from 'react-toastify';

import LoadingSpinner from '../LoadingSpinner';

import { useGetCustomerProfileDataQuery } from '../../app/api/customerApi';
import { useLogoutCustomerMutation } from '../../app/api/authApi';

const NavbarCustomers = () => {
    const navigate = useNavigate();

    const {
        data: customer,
        isLoading,
        isFetching,
        isError,
        error,
    } = useGetCustomerProfileDataQuery();

    const [
        logoutCustomer,
        {
            isLoading: isLogoutLoading,
            isSuccess,
            error: logoutError,
            isError: isLogoutError,
        },
    ] = useLogoutCustomerMutation();

    useEffect(() => {
        if (isSuccess) {
            navigate('/login');
        }

        if (isLogoutError) {
            if (Array.isArray(logoutError).data.error) {
                logoutError.data.error.forEach((el) => toast.error(el.message));
            } else {
                toast.error(logoutError.data.message);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLogoutLoading]);

    const handleLogout = () => {
        logoutCustomer();
        toast.success('See you soon 👋!', {
            position: 'bottom-right',
        });
    };

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
                                    className='bg-color-none hover:text-primaryColor-gold'
                                    onClick={() => {
                                        navigate('/landing-page');
                                    }}
                                >
                                    Home
                                </Button>
                            </li>
                            <li>
                                <Button
                                    className='bg-color-none hover:text-primaryColor-gold'
                                    onClick={() => {
                                        navigate('/customers-orders');
                                    }}
                                >
                                    Orders
                                </Button>
                            </li>
                            <li>
                                <Button
                                    className='bg-color-none hover:text-primaryColor-gold'
                                    onClick={() => {
                                        navigate('/customers-favorites');
                                    }}
                                >
                                    Favorites
                                </Button>
                            </li>
                        </ul>
                    </div>

                    <Dropdown placement='bottom-end'>
                        <DropdownTrigger>
                            <div className='flex items-center gap-2 cursor-pointer'>
                                <Avatar
                                    isBordered
                                    as='button'
                                    className='transition-transform'
                                    color='secondaryColor'
                                    name='profile'
                                    size='sm'
                                    src='https://i.pravatar.cc/150?u=a042581f4e29026704d'
                                />
                                <span>
                                    {(!isLoading || customer) &&
                                        customer.first_name}
                                </span>
                            </div>
                        </DropdownTrigger>
                        <DropdownMenu
                            aria-label='Profile Actions'
                            variant='flat'
                        >
                            <DropdownItem
                                key='settings'
                                className='h-8'
                                onClick={() => {
                                    navigate(`/update-profile/${customer._id}`);
                                }}
                            >
                                Profile
                            </DropdownItem>

                            <DropdownItem
                                key='logout'
                                color='danger'
                                className='h-8'
                                onClick={handleLogout}
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
