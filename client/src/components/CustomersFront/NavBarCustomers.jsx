

import React from 'react';
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
    Link,
} from '@nextui-org/react';

const NavbarCustomers = ({customer}) => {
    const navigate = useNavigate();

    return (
        <div className=' shadow-md  border-black'>
            <Navbar>
                <NavbarContent
                    className='hidden sm:flex gap-4'
                    justify='center'
                ></NavbarContent>

                <NavbarContent as='div' justify='end'>
                    <div className='flex justify-center '>
                        <ul className='flex justify-around w-80 relative right-80     '>
                            <li>
                                <Link>Home</Link>
                            </li>

                            <li>
                                <Link>Orders</Link>
                            </li>
                            <li>
                                <Link>Favorites</Link>
                            </li>
                        </ul>
                    </div>
                    <Dropdown placement='bottom-end'>
                        <DropdownTrigger>
                            <Avatar
                                isBordered
                                as='button'
                                className='transition-transform'
                                color='secondary'
                                name='Jason Hughes'
                                size='sm'
                                src='https://i.pravatar.cc/150?u=a042581f4e29026704d'
                            />
                        </DropdownTrigger>
                        <DropdownMenu
                            aria-label='Profile Actions'
                            variant='flat'
                        >
                            <DropdownItem key='profile' className='h-14 gap-2 '>
                                <p className='font-semibold'>
                                    {customer.email}
                                </p>
                            </DropdownItem>

                            <DropdownItem key='profile' className='h-8'>
                                {' '}
                                <Button className='bg-color-none '>
                                    Profile
                                </Button>
                            </DropdownItem>

                            <DropdownItem key='settings' className='h-8'>
                                <Button
                                    className='bg-color-none '
                                    onClick={() => {
                                        navigate('/updateCustomers');
                                    }}
                                >
                                    Settings
                                </Button>

                                {/* <Settings isOpen={isOpen} onOpenChange={onOpenChange} /> */}
                            </DropdownItem>

                            <DropdownItem key='logout' color='danger' className='h-8'>
                                <Button
                                    className='bg-color-none'
                                >
                                    Log out
                                </Button>{' '}
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </NavbarContent>
            </Navbar>
        </div>
    );
};

export default NavbarCustomers;
