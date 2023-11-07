import React from 'react';
import { Button, useDisclosure } from '@nextui-org/react';

const DeleteCustomer = () => {
    const { onOpen} = useDisclosure();
    return (
        <>
            <Button
                onPress={onOpen}
                className='bg-foreground text-background'
                size='sm'
            >
                View
            </Button>
        
        </>
    );
};

export default DeleteCustomer;
