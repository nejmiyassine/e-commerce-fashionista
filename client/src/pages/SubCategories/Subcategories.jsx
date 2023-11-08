import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getAllSubcategories,
    editSubcategory,
    deleteSubcategory,
    createSubcategory,
} from '../../features/subcategories/subcategoriesSlice';
import Layout from '../../layouts/Layout';

const Subcategories = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [updatedName, setUpdatedName] = useState('');
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(null);
    const subcategories = useSelector(
        (state) => state.subcategories.subcategories
    );

    useEffect(() => {
        dispatch(getAllSubcategories());
    }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name) {
            console.error('Subcategory Name is Required');
            return;
        }

        try {
            const { data } = await dispatch(createSubcategory(name));
            if (data && data.success) {
                setName('');
                console.log('Subcategory has been successfully created');
                // Refresh subcategories list
                dispatch(getAllSubcategories());
            } else if (data) {
                console.error(data.message);
            } else {
                console.error('Error creating a subcategory');
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
            if (data.success) {
                setUpdatedName('');
                setSelectedSubcategory(null);
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error('Error during subcategory update', error);
        }
    };

    const handleDelete = async (subcategoryId) => {
        try {
            const { data } = await dispatch(deleteSubcategory(subcategoryId));
            if (data.success) {
                console.log('Subcategory deleted');
                // Refresh subcategories list
                dispatch(getAllSubcategories());
            } else {
                console.error(data.message);
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

    return (
        <Layout>
            <div className='container mx-auto p-6'>
                <h1 className='text-3xl font-bold text-center'>
                    Manage Subcategories
                </h1>
                <div className='mt-4 mb-8 text-center'>
                    <form
                        onSubmit={handleSubmit}
                        className='flex justify-center'
                    >
                        <input
                            type='text'
                            className='border rounded-l p-2'
                            placeholder='Enter new subcategory'
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
                                    Subcategory
                                </th>
                                <th className='py-3 border-b-2 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {subcategories.map((subcategory) => (
                                <tr key={subcategory._id} className='bg-white'>
                                    <td className='py-5 border-b border-gray-200 text-sm px-4'>
                                        {subcategory.name}
                                    </td>
                                    <td className='py-5 border-b border-gray-200 text-sm'>
                                        <div className='flex justify-center'>
                                            <button
                                                type='button'
                                                onClick={() =>
                                                    setSelectedSubcategory(
                                                        subcategory
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
                                                        subcategory._id
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
                {selectedSubcategory && (
                    <div className='fixed inset-0 flex items-center justify-center'>
                        <div className='relative bg-white p-6 shadow-lg rounded-lg'>
                            <form onSubmit={handleUpdate}>
                                <div className='input-group mb-3'>
                                    <input
                                        type='text'
                                        className='form-control'
                                        placeholder='Enter updated subcategory'
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
                                onClick={() => setSelectedSubcategory(null)}
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
                                Are you sure you want to delete this
                                subcategory?
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

export default Subcategories;
