import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getAllCategories,
    editCategory,
    deleteCategory,
    createCategory,
} from '../../features/categories/categoriesSlice';
import Layout from '../../layouts/Layout';

const CreateCategory = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [updatedName, setUpdatedName] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(null);
    const listCategories = useSelector((state) => state.categories.categories);

    useEffect(() => {
        dispatch(getAllCategories());
    }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name) {
            console.error('Category Name is Required');
            return;
        }

        try {
            const { data } = await dispatch(createCategory(name));
            if (data?.success) {
                setName('');
                console.log('Category has been successfully created');
            } else {
                console.error('Error creating a category');
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
            const { data } = await dispatch(deleteCategory(categoryId));
            if (data?.success) {
                console.log('Category deleted');
                dispatch(getAllCategories());
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error(
                'Something went wrong during category deletion',
                error
            );
        }
    };

    const handleConfirmDelete = () => {
        if (confirmDelete) {
            handleDelete(confirmDelete);
            setConfirmDelete(null);
        }
    };

    return (
        <Layout>
            <div className='container mx-auto p-6'>
                <h1 className='text-3xl font-bold text-center'>
                    Manage Categories
                </h1>
                <div className='mt-4 mb-8 text-center'>
                    <form
                        onSubmit={handleSubmit}
                        className='flex justify-center'
                    >
                        <input
                            type='text'
                            className='border rounded-l p-2'
                            placeholder='Enter new category'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <button
                            type='submit'
                            className='bg-blue-500 text-white px-4 py-2 rounded-r'
                        >
                            Submit
                        </button>
                    </form>
                </div>
                <div className='min-w-full bg-white border rounded-lg shadow-md'>
                    <table className='min-w-full leading-normal'>
                        <thead>
                            <tr>
                                <th className='py-3 border-b-2 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                                    Item
                                </th>
                                <th className='py-3 border-b-2 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {listCategories.map((category) => (
                                <tr key={category._id} className='bg-white'>
                                    <td className='py-5 border-b border-gray-200 text-sm px-4'>
                                        {category.name}
                                    </td>
                                    <td className='py-5 border-b border-gray-200 text-sm'>
                                        <div className='flex justify-center'>
                                            <button
                                                type='button'
                                                onClick={() =>
                                                    setSelectedCategory(
                                                        category
                                                    )
                                                }
                                                className='text-blue-500 hover:text-blue-700 mx-2'
                                            >
                                                Edit
                                            </button>
                                            <button
                                                type='button'
                                                onClick={() =>
                                                    setConfirmDelete(
                                                        category._id
                                                    )
                                                }
                                                className='text-red-500 hover:text-red-700 mx-2'
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {selectedCategory && (
                    <div className='fixed inset-0 flex items-center justify-center'>
                        <div className='relative bg-white p-6 shadow-lg rounded-lg'>
                            <form onSubmit={handleUpdate}>
                                <div className='input-group mb-3'>
                                    <input
                                        type='text'
                                        className='form-control'
                                        placeholder='Enter updated category'
                                        value={updatedName}
                                        onChange={(e) =>
                                            setUpdatedName(e.target.value)
                                        }
                                    />
                                    <button
                                        type='submit'
                                        className='btn btn-primary'
                                    >
                                        Update
                                    </button>
                                </div>
                            </form>
                            <button
                                onClick={() => setSelectedCategory(null)}
                                className='bg-gray-500 text-white px-4 py-2 rounded-md mt-2'
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
                {confirmDelete && (
                    <div className='fixed inset-0 flex items-center justify-center'>
                        <div className='relative bg-white p-6 shadow-lg rounded-lg'>
                            <p className='mb-4'>
                                Are you sure you want to delete this category?
                            </p>
                            <button
                                onClick={handleConfirmDelete}
                                className='bg-red-500 text-white px-4 py-2 rounded-md mx-2'
                            >
                                Confirm
                            </button>
                            <button
                                onClick={() => setConfirmDelete(null)}
                                className='bg-gray-500 text-white px-4 py-2 rounded-md mx-2'
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default CreateCategory;
