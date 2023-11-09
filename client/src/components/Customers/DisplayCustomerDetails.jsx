import {React } from 'react';
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
} from '@nextui-org/react';

// const DeleteCustomer = () => {
//     const { onOpen} = useDisclosure();
//     return (
//         <>
//              {/* <Button
//                 onPress={onOpen}
//                 className='bg-foreground text-background'
//                 size='sm'
//             >
//                 View
//             </Button>  */}

const DisplayCustomerDetails = () => {
    return (
        <Table removeWrapper aria-label='Example  collection table'>
            <TableHeader>
                <TableColumn>PRODUCT ID</TableColumn>
                <TableColumn>PRODUCT NAME</TableColumn>
                <TableColumn>STATUS</TableColumn>
                <TableColumn>PRICE</TableColumn>
                <TableColumn>PAYMENT</TableColumn>
            </TableHeader>

            <TableBody>
                <TableRow key='1'>
                    <TableCell>Product</TableCell>
                    <TableCell>Product</TableCell>
                    <TableCell>Orders</TableCell>
                    <TableCell>Active</TableCell>
                    <TableCell>Active</TableCell>
                </TableRow>
              
            </TableBody>
        </Table>
    );
};

export default DisplayCustomerDetails;
