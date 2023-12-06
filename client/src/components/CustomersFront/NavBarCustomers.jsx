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
import { logOutCustomer } from '../../features/customers/frontCustomerSlice';

const NavbarCustomers = ({ customer }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
                                        navigate(
                                            '/customersFavorites'
                                        );
                                    }}
                                >
                                    Favorites
                                </Button>
                            </li>
                        </ul>
                    </div>
                    <Dropdown placement='bottom-end'>
                        <DropdownTrigger>
                            <Avatar
                                isBordered
                                as='button'
                                className='transition-transform'
                                color='secondaryColor'
                                name='Jason Hughes'
                                size='sm'
                                src='https://i.pravatar.cc/150?u=a042581f4e29026704d'
                            />
                        </DropdownTrigger>
                        <DropdownMenu
                            aria-label='Profile Actions'
                            variant='flat'
                        >
                            <DropdownItem key='email'>
                                <p className='font-semibold'>
                                    {customer.email}
                                </p>
                            </DropdownItem>

                        

                            <DropdownItem key='settings' className='h-8'>
                                <Button
                                    className='bg-color-none '
                                    onClick={() => {
                                        navigate(`/updateProfile/${customer._id}`);
                                    }}
                                >
                                    Settings
                                </Button>

                            </DropdownItem>

                            <DropdownItem
                                key='logout'
                                color='danger'
                                className='h-8'
                            >
                                <Button className='bg-color-none'
                                onClick={() => {

                                 dispatch(logOutCustomer()) 
                                navigate('/login')
                            }
                                }
                                >
                                
                                    Log out
                                </Button>
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </NavbarContent>
            </Navbar>
        </div>
    );
};

export default NavbarCustomers;
