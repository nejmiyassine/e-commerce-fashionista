import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { MdEdit, MdDelete } from 'react-icons/md';
import { IoIosClose } from 'react-icons/io';
import { RiAddCircleLine } from 'react-icons/ri';
import { CiSearch } from 'react-icons/ci';

import {
    getAllCategories,
    editCategory,
    deleteCategory,
    createCategory,
} from '../../../features/categories/categoriesSlice';
import Layout from '../../../layouts/Layout';

const columns = [
    { name: 'NAME', uid: 'name' },
    { name: 'ACTIONS', uid: 'actions' },
];

const ManageCategories = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [updatedName, setUpdatedName] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddingCategory, setIsAddingCategory] = useState(false);
    const listCategories = useSelector((state) => state.categories.categories);

    useEffect(() => {
        dispatch(getAllCategories());
    }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await dispatch(createCategory(name));
            console.log('Create Category Response:', response);

            if (response?.meta?.requestStatus === 'fulfilled') {
                const payload = response.payload;

                if (payload !== undefined && payload.success) {
                    console.log('Category created successfully');
                    dispatch(getAllCategories());
                    setName('');
                    setIsAddingCategory(false);
                } else if (payload !== undefined && payload.message) {
                    console.error(
                        'Category creation failed. Message:',
                        payload.message
                    );
                } else {
                    console.error(
                        'Category creation failed. Unexpected payload:',
                        payload
                    );
                }
            } else {
                console.error('Category creation failed. Response:', response);
            }
        } catch (error) {
            console.error('Something went wrong: ', error);
        }
    };

    const handleUpdate = async () => {
        if (!selectedCategory) {
            console.error('No category selected for update');
            return;
        }

        try {
            const { data } = await dispatch(
                editCategory({ id: selectedCategory._id, name: updatedName })
            );

            if (data?.success) {
                setUpdatedName('');
                setSelectedCategory(null);
                dispatch(getAllCategories());
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error('Something went wrong during category update', error);
        }
    };

    const handleDelete = async (categoryId) => {
        try {
            const response = await dispatch(deleteCategory(categoryId));

            if (response?.meta?.requestStatus === 'fulfilled') {
                console.log('Category deleted');
                dispatch(getAllCategories());
            } else {
                console.error(response?.payload || 'Unknown error');
            }
        } catch (error) {
            console.error('Error during category deletion', error);
        }
    };

    const handleConfirmDelete = () => {
        if (confirmDelete) {
            handleDelete(confirmDelete);
            setConfirmDelete(null);
        }
    };

    // Function to open the add category modal
    const openAddCategoryModal = () => {
        setIsAddingCategory(true);
    };

    // Function to close the add category modal
    const closeAddCategoryModal = () => {
        setIsAddingCategory(false);
    };

    const filteredCategories = listCategories.filter((category) =>
        category?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const topContent = useMemo(() => {
        return (
            <div className='container mx-auto'>
                <div className='flex justify-between items-center flex-col gap-2 md:flex-row mt-4 mb-4'>
                    <div>
                        <Input
                            variant='underlined'
                            type='text'
                            className='w-[250px] md:w-[350px]'
                            labelPlacement='outside'
                            placeholder='Search for Categories'
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
                            onClick={openAddCategoryModal}
                            className='flex items-center justify-center font-semibold gap-1 transition bg-black text-white border border-black hover:bg-white hover:text-black hover:border hover:border-black px-4 py-2'
                        >
                            <RiAddCircleLine size={20} />
                            Add a Category
                        </button>
                    </div>
                </div>
                <Spacer y={4} />
                <hr />
                <Spacer y={2} />
            </div>
        );
    }, [searchTerm]);

    const renderCell = useCallback((category, columnKey) => {
        const cellValue = category[columnKey];

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
                        <Tooltip content='Edit category'>
                            <span className='text-sm flex items-center gap-1 py-1 px-2 rounded-md text-white bg-green-500 cursor-pointer active:opacity-50'>
                                <MdEdit
                                    onClick={() =>
                                        setSelectedCategory(category)
                                    }
                                />
                                Edit
                            </span>
                        </Tooltip>
                        <Tooltip color='danger' content='Delete category'>
                            <span className='text-sm text-white bg-danger flex items-center gap-1 py-1 px-2 rounded-md cursor-pointer active:opacity-50'>
                                <MdDelete
                                    onClick={() =>
                                        setConfirmDelete(category._id)
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

    return (
        <Layout>
            <h2 className='text-lg md:text-3xl font-bold text-center mt-4 mb-6'>
                Manage Your Categories
            </h2>
            {/* Add Category Modal */}
            {isAddingCategory && (
                <div className='fixed inset-0 z-50 flex items-center justify-center'>
                    <div
                        className='absolute inset-0 bg-black opacity-50'
                        onClick={closeAddCategoryModal}
                    ></div>
                    <div className='relative bg-white w-[350px] p-6 shadow-lg rounded-lg'>
                        <div className='pb-4 flex items-center justify-between'>
                            <h2 className='text-xl font-bold'>
                                Add New Category
                            </h2>
                            <IoIosClose
                                size={25}
                                className='text-default-500 hover:cursor-pointer hover:text-default-700'
                                onClick={closeAddCategoryModal}
                            />
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className='input-group flex flex-col gap-4'>
                                <Input
                                    variant='underlined'
                                    type='text'
                                    className='form-control'
                                    placeholder='Add New Category'
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

            {/* Edit Category Modal */}
            {selectedCategory && (
                <div className='fixed inset-0 z-50 flex items-center justify-center'>
                    <div
                        className='absolute inset-0 bg-black opacity-50'
                        onClick={() => setSelectedCategory(null)}
                    ></div>
                    <div className='relative bg-white w-[350px] p-6 shadow-lg rounded-lg'>
                        <div className='pb-4 flex items-center justify-between'>
                            <h2 className='text-xl font-bold text-black'>
                                Update your Category
                            </h2>
                            <IoIosClose
                                size={25}
                                className='text-default-500 hover:cursor-pointer hover:text-default-700'
                                onClick={() => setSelectedCategory(null)}
                            />
                        </div>

                        <form onSubmit={handleUpdate}>
                            <div className='flex flex-col gap-4'>
                                <Input
                                    variant='underlined'
                                    type='text'
                                    placeholder='Update your category'
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
                                        Update Category
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Category Confirmation Modal */}
            {confirmDelete && (
                <div className='fixed inset-0 z-50 flex items-center justify-center'>
                    <div
                        className='absolute inset-0 bg-black opacity-50'
                        onClick={() => setConfirmDelete(null)}
                    ></div>

                    <div className='relative bg-white p-6 shadow-lg rounded-lg'>
                        <p className='mb-4'>
                            Are you sure you want to <strong>delete</strong>{' '}
                            this category?
                        </p>
                        <button
                            onClick={handleConfirmDelete}
                            className='bg-red-400 transition hover:bg-red-700  font-semibold text-white px-4 py-2 rounded-md mx-2'
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
                    items={filteredCategories}
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

export default ManageCategories;
