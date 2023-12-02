import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Tooltip,
    Input,
    Spacer,
} from '@nextui-org/react';
import { CiSearch } from 'react-icons/ci';
import { RiAddCircleLine } from 'react-icons/ri';
import { IoIosClose } from 'react-icons/io';
import { MdDelete, MdEdit } from 'react-icons/md';

import LoadingSpinner from '../../../components/LoadingSpinner';
import {
    getAllSubcategories,
    editSubcategory,
    deleteSubcategory,
    createSubcategory,
} from '../../../features/subcategories/subcategoriesSlice';
import Layout from '../../../layouts/Layout';

const columns = [
    { name: 'NAME', uid: 'name' },
    { name: 'ACTIONS', uid: 'actions' },
];

const ManageSubcategories = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [updatedName, setUpdatedName] = useState('');
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddingSubcategory, setIsAddingSubcategory] = useState(false);
    const { subcategories, isLoading, error } = useSelector(
        (state) => state.subcategories
    );

    useEffect(() => {
        if (error) {
            toast.error(error.data.message);
        }

        dispatch(getAllSubcategories());
    }, [dispatch, error]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await dispatch(createSubcategory(name));
            console.log('Create Subcategory Response:', response);

            if (response?.meta?.requestStatus === 'fulfilled') {
                const { success, subcategory } = response.payload;

                console.log('Success:', success);
                console.log('Subcategory:', subcategory);

                if (success) {
                    console.log('Subcategory created successfully');
                    dispatch(getAllSubcategories());
                    setName('');
                    setIsAddingSubcategory(false);
                } else {
                    console.error(
                        'Subcategory creation failed. Unexpected payload:',
                        response.payload
                    );
                }
            } else {
                console.error(
                    'Subcategory creation failed. Response:',
                    response
                );
            }
        } catch (error) {
            console.error('Something went wrong in the input form', error);
        }
    };

    const handleUpdate = async () => {
        if (!selectedSubcategory) {
            console.error('No subcategory selected for update');
            return;
        }

        try {
            const { data } = await dispatch(
                editSubcategory({
                    id: selectedSubcategory._id,
                    name: updatedName,
                })
            );

            if (data?.succes) {
                setUpdatedName('');
                setSelectedSubcategory(null);
                dispatch(getAllSubcategories());
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error('Error during subcategory update', error);
        }
    };

    const handleDelete = async (subcategoryId) => {
        try {
            const response = await dispatch(deleteSubcategory(subcategoryId));

            if (response?.meta?.requestStatus === 'fulfilled') {
                console.log('Subcategory deleted');
                dispatch(getAllSubcategories());
            } else {
                console.error(response?.payload || 'Unknown error');
            }
        } catch (error) {
            console.error('Error during subcategory deletion', error);
        }
    };

    const handleConfirmDelete = () => {
        if (confirmDelete) {
            handleDelete(confirmDelete);
            setConfirmDelete(null);
        }
    };

    // Function to open the add subcategory modal
    const openAddSubcategoryModal = () => {
        setIsAddingSubcategory(true);
    };

    // Function to close the add subcategory modal
    const closeAddSubcategoryModal = () => {
        setIsAddingSubcategory(false);
    };

    const filteredSubcategories = subcategories.filter(
        (subcategory) =>
            subcategory &&
            subcategory.name &&
            subcategory.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const topContent = useMemo(() => {
        return (
            <div className='container mx-auto'>
                <div className='flex justify-between items-center flex-col gap-2 md:flex-row mt-4 mb-4'>
                    <div>
                        <Input
                            variant='underlined'
                            type='text'
                            labelPlacement='outside'
                            placeholder='Search for subcategories'
                            className='w-[250px] md:w-[350px]'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            endContent={
                                <CiSearch
                                    size={20}
                                    className='text-default-400'
                                />
                            }
                        />
                    </div>
                    <div>
                        <button
                            onClick={openAddSubcategoryModal}
                            className='flex items-center font-semibold gap-1 transition bg-black text-white border border-black hover:bg-white hover:text-black hover:border hover:border-black px-4 py-2'
                        >
                            <RiAddCircleLine size={20} />
                            Add a Subcategory
                        </button>
                    </div>
                </div>

                <Spacer y={2} />
                <hr />
                <Spacer y={2} />
            </div>
        );
    }, [searchTerm]);

    const renderCell = useCallback((subcategory, columnKey) => {
        const cellValue = subcategory[columnKey];

        switch (columnKey) {
            case 'name':
                return (
                    <div className='w-[250px] md:w-[400px] py-2 flex flex-col'>
                        <p className='font-semibold capitalize'>{cellValue}</p>
                    </div>
                );
            case 'actions':
                return (
                    <div className='w-full md:w-[250px] relative flex items-center gap-2'>
                        <Tooltip content='Edit subcategory'>
                            <span className='text-sm flex items-center gap-1 py-1 px-2 rounded-md text-white bg-green-500 cursor-pointer active:opacity-50'>
                                <MdEdit
                                    onClick={() =>
                                        setSelectedSubcategory(subcategory)
                                    }
                                />
                                Edit
                            </span>
                        </Tooltip>
                        <Tooltip color='danger' content='Delete category'>
                            <span className='text-sm text-white bg-danger flex items-center gap-1 py-1 px-2 rounded-md cursor-pointer active:opacity-50'>
                                <MdDelete
                                    onClick={() =>
                                        setConfirmDelete(subcategory._id)
                                    }
                                />
                                Delete
                            </span>
                        </Tooltip>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    if (isLoading) return <LoadingSpinner />;

    return (
        <Layout>
            <h2 className='text-lg md:text-3xl font-bold text-center mt-4 mb-6'>
                Manage Subcategories
            </h2>

            {/* Add Subcategory Modal */}
            {isAddingSubcategory && (
                <div className='fixed inset-0 z-50 flex items-center justify-center'>
                    <div
                        className='absolute inset-0 bg-black opacity-50'
                        onClick={closeAddSubcategoryModal}
                    ></div>
                    <div className='relative bg-white w-[350px] p-6 shadow-lg rounded-lg'>
                        <div className='pb-4 flex items-center justify-between'>
                            <h2 className='text-xl font-bold'>
                                Add New Subcategory
                            </h2>
                            <IoIosClose
                                size={25}
                                className='text-default-500 hover:cursor-pointer hover:text-default-700'
                                onClick={closeAddSubcategoryModal}
                            />
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className='input-group flex flex-col gap-4'>
                                <Input
                                    variant='underlined'
                                    type='text'
                                    className='form-control'
                                    placeholder='Add New Subcategory'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    endContent={
                                        <RiAddCircleLine
                                            size={20}
                                            className='text-default-400'
                                        />
                                    }
                                />
                                <div className='flex justify-end'>
                                    <button
                                        type='submit'
                                        className='font-semibold flex items-center gap-1 text-sm mt-2 bg-black text-white transition-all border border-white hover:bg-white hover:text-black hover:border-black px-4 py-2 rounded-md'
                                    >
                                        <RiAddCircleLine />
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {selectedSubcategory && (
                <div className='fixed inset-0 z-50 flex items-center justify-center'>
                    <div
                        className='absolute inset-0 bg-black opacity-50'
                        onClick={() => setSelectedSubcategory(null)}
                    ></div>

                    <div className='relative bg-white p-6 w-[350px] shadow-lg rounded-lg'>
                        <div className='pb-4 flex items-center justify-between'>
                            <h2 className='text-xl font-bold'>
                                Update your subcategory
                            </h2>
                            <IoIosClose
                                size={25}
                                className='text-default-500 hover:cursor-pointer hover:text-default-700'
                                onClick={() => setSelectedSubcategory(null)}
                            />
                        </div>

                        <form onSubmit={handleUpdate}>
                            <div className='flex flex-col gap-4'>
                                <Input
                                    variant='underlined'
                                    type='text'
                                    placeholder='Update your subcategory'
                                    value={updatedName}
                                    onChange={(e) =>
                                        setUpdatedName(e.target.value)
                                    }
                                    endContent={
                                        <MdEdit
                                            size={20}
                                            className='text-default-400'
                                        />
                                    }
                                />
                                <div className='flex justify-end'>
                                    <button
                                        type='submit'
                                        className='font-semibold flex items-center gap-1 text-sm mt-2 bg-black text-white transition-all border border-white hover:bg-white hover:text-black hover:border-black px-4 py-2 rounded-md'
                                    >
                                        <MdEdit />
                                        Update subcategory
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Subcategory Confirmation Modal */}
            {confirmDelete && (
                <div className='fixed inset-0 z-50 flex items-center justify-center'>
                    <div
                        className='absolute inset-0 bg-black opacity-50'
                        onClick={() => setConfirmDelete(null)}
                    ></div>

                    <div className='relative bg-white p-6 shadow-lg rounded-lg'>
                        <p className='mb-4'>
                            Are you sure you want to <strong>delete</strong>{' '}
                            this subcategory?
                        </p>
                        <button
                            onClick={handleConfirmDelete}
                            className='bg-red-400 transition hover:bg-red-700 font-semibold text-white px-4 py-2 rounded-md mx-2'
                        >
                            Confirm
                        </button>
                        <button
                            onClick={() => setConfirmDelete(null)}
                            className='bg-gray-600 transition hover:bg-gray-500 text-white px-4 py-2 rounded-md mx-2'
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            <Table
                isStriped
                topContent={topContent}
                aria-label='Example table with custom cells'
            >
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn
                            key={column.uid}
                            align={
                                column.uid === 'actions' ? 'center' : 'start'
                            }
                        >
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody
                    emptyContent={'No category found'}
                    items={filteredSubcategories}
                >
                    {(item) => (
                        <TableRow key={item._id} className='py-2'>
                            {(columnKey) => (
                                <TableCell>
                                    {renderCell(item, columnKey)}
                                </TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </Layout>
    );
};

export default ManageSubcategories;
