import PropTypes from 'prop-types';
import {
    Input,
    Dropdown,
    Button,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
} from '@nextui-org/react';
// import { ChevronDownIcon, SearchIcon } from '../../icons/Icons';
import { capitalize } from '../utils/capitalize';
import { ChevronDownIcon, SearchIcon, UserPlus } from '../icons/Icons';

const TableTopContent = ({
    filterValue,
    setFilterValue,
    statusFilter,
    setStatusFilter,
    visibleColumns,
    setVisibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    onOpen,
    statusOptions,
    columns,
    loading,
    data,
}) => {
    return (
        <div className='flex flex-col gap-4'>
            <div className='flex justify-between gap-3 items-end'>
                <Input
                    isClearable
                    classNames={{
                        base: 'w-full sm:max-w-[44%]',
                        inputWrapper: 'border-1',
                    }}
                    placeholder='Search by name...'
                    size='sm'
                    startContent={<SearchIcon className='text-default-300' />}
                    value={filterValue}
                    variant='bordered'
                    onClear={() => setFilterValue('')}
                    onValueChange={onSearchChange}
                />
                <div className='flex gap-3'>
                    <Dropdown>
                        <DropdownTrigger className='hidden sm:flex'>
                            <Button
                                endContent={
                                    <ChevronDownIcon className='text-small' />
                                }
                                size='sm'
                                variant='flat'
                            >
                                Role
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            disallowEmptySelection
                            aria-label='Table Columns'
                            closeOnSelect={false}
                            selectedKeys={statusFilter}
                            selectionMode='multiple'
                            onSelectionChange={setStatusFilter}
                        >
                            {statusOptions.map((status) => (
                                <DropdownItem
                                    key={status.uid}
                                    className='capitalize'
                                >
                                    {capitalize(status.name)}
                                </DropdownItem>
                            ))}
                        </DropdownMenu>
                    </Dropdown>
                    <Dropdown>
                        <DropdownTrigger className='hidden sm:flex'>
                            <Button
                                endContent={
                                    <ChevronDownIcon className='text-small' />
                                }
                                size='sm'
                                variant='flat'
                            >
                                Columns
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            disallowEmptySelection
                            aria-label='Table Columns'
                            closeOnSelect={false}
                            selectedKeys={visibleColumns}
                            selectionMode='multiple'
                            onSelectionChange={setVisibleColumns}
                        >
                            {columns.map((column) => (
                                <DropdownItem
                                    key={column.uid}
                                    className='capitalize'
                                >
                                    {capitalize(column.name)}
                                </DropdownItem>
                            ))}
                        </DropdownMenu>
                    </Dropdown>
                    {onOpen && (
                        <Button
                            className='bg-foreground text-background'
                            size='sm'
                            isDisabled={loading}
                            endContent={<UserPlus />}
                            onPress={onOpen}
                        >
                            Add User
                        </Button>
                    )}
                </div>
            </div>
            <div className='flex justify-between items-center'>
                <span className='text-default-400 text-small'>
                    Total {data && data.length} users
                </span>
                <label className='flex items-center text-default-400 text-small'>
                    Rows per page:
                    <select
                        className='bg-transparent outline-none text-default-400 text-small'
                        onChange={onRowsPerPageChange}
                    >
                        <option value='5'>5</option>
                        <option value='10'>10</option>
                        <option value='15'>15</option>
                    </select>
                </label>
            </div>
        </div>
    );
};

export default TableTopContent;

TableTopContent.propTypes = {
    filterValue: PropTypes.string,
    setFilterValue: PropTypes.func,
    statusFilter: PropTypes.string,
    setStatusFilter: PropTypes.func,
    visibleColumns: PropTypes.object,
    setVisibleColumns: PropTypes.func,
    onSearchChange: PropTypes.func,
    onRowsPerPageChange: PropTypes.func,
    onOpen: PropTypes.func,
    statusOptions: PropTypes.array,
    columns: PropTypes.array,
    loading: PropTypes.bool,
    data: PropTypes.any,
};
