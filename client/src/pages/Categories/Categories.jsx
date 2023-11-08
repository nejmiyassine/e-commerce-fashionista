import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories, editCategory, deleteCategory, createCategory } from "../../features/categories/categoriesSlice";
import AdminNavbar from "../../layouts/AdminNavbar";

const ManageCategories = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [updatedName, setUpdatedName] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [isAddingCategory, setIsAddingCategory] = useState(false);
    const listCategories = useSelector(state => state.categories.categories);

    useEffect(() => {
        dispatch(getAllCategories());
    }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name) {
            console.error("Category Name is Required");
            return;
        }

        try {
            const { data } = await dispatch(createCategory(name));
            if (data?.success) {
                setName("");
                console.log("Category has been successfully created");
                dispatch(getAllCategories());
                setIsAddingCategory(false);
            } else {
                console.error("Error creating a category");
            }
        } catch (error) {
            console.error("Something went wrong in the input form", error);
        }
    };

    const handleUpdate = async () => {
        if (!selectedCategory) {
            console.error("No category selected for update");
            return;
        }

        try {
            const { data } = await dispatch(editCategory({ id: selectedCategory._id, name: updatedName }));
            if (data?.success) {
                setUpdatedName("");
                setSelectedCategory(null);
                dispatch(getAllCategories());
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error("Something went wrong during category update", error);
        }
    };

    const handleDelete = async (categoryId) => {
        try {
            const { data } = await dispatch(deleteCategory(categoryId));
            if (data?.success) {
                console.log("Category deleted");
                dispatch(getAllCategories());
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error("Something went wrong during category deletion", error);
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

    const filteredCategories = listCategories.filter(category => category.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="container mx-auto p-6">
            <AdminNavbar />

            <h1 className="text-3xl font-bold text-center">Manage Categories</h1>
            <div className="flex justify-between items-center mt-4 mb-8">
                <div>
                    {/* Search input on the far left */}
                    <input
                        type="text"
                        placeholder="Search Categories"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border p-2 rounded"
                    />
                </div>
                <div>
                    {/* Button to open the add category modal on the far right */}
                    <button
                        onClick={openAddCategoryModal}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Add a Category
                    </button>
                </div>
            </div>

            {/* Add Category Modal */}
            {isAddingCategory && (
                <div className="fixed inset-0 flex items-center justify-center">
                    <div className="relative bg-white p-6 shadow-lg rounded-lg">
                        <form onSubmit={handleSubmit}>
                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter new category"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <button type="submit" className="btn btn-primary bg-blue-500 text-black px-4 py-2 rounded-md">
                                    Submit
                                </button>
                            </div>
                            <button
                                onClick={closeAddCategoryModal}
                                className="bg-red-500 text-white px-4 py-2 items-center rounded-md mt-2"
                            >
                                Close
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* List of Categories */}
            <div className="min-w-full bg-white border rounded-lg shadow-md">
                <table className="min-w-full leading-normal">
                    <thead>
                        <tr>
                            <th className="py-3 border-b-2 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                Category
                            </th>
                            <th className="py-3 border-b-2 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCategories.map((category) => (
                            <tr key={category._id} className="bg-white">
                                <td className="py-5 border-b border-gray-200 text-sm px-4">
                                    {category.name}
                                </td>
                                <td className="py-5 border-b border-gray-200 text-sm">
                                    <div className="flex justify-center">
                                        <button
                                            type="button"
                                            onClick={() => setSelectedCategory(category)}
                                            className=" hover:text-blue-700 mx-2 bg-green-500 text-white px-4 py-2 rounded-lg"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setConfirmDelete(category._id)}
                                            className="hover:text-blue-700 mx-2 bg-red-500 text-white px-4 py-2 rounded-lg"
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

            {/* Edit Category Modal */}
            {selectedCategory && (
                <div className="fixed inset-0 flex items-center justify-center">
                    <div className="relative bg-white p-6 shadow-lg rounded-lg">
                        <form onSubmit={handleUpdate}>
                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter updated category"
                                    value={updatedName}
                                    onChange={(e) => setUpdatedName(e.target.value)}
                                />
                                <button type="submit" className="btn btn-primary bg-blue-500 text-black px-4 py-2 rounded-md ">
                                    Update
                                </button>
                            </div>
                            <button
                                onClick={() => setSelectedCategory(null)}
                                className="bg-red-500 text-white px-4 py-2 rounded-md mt-2"
                            >
                                Close
                            </button>
                        </form>
                    </div>
                </div>
            )
            }

            {/* Delete Category Confirmation Modal */}
            {confirmDelete && (
                <div className="fixed inset-0 flex items-center justify-center">
                    <div className="relative bg-white p-6 shadow-lg rounded-lg">
                        <p className="mb-4">Are you sure you want to delete this category?</p>
                        <button onClick={handleConfirmDelete} className="bg-red-500 text-white px-4 py-2 rounded-md mx-2">
                            Confirm
                        </button>
                        <button
                            onClick={() => setConfirmDelete(null)}
                            className="bg-gray-500 text-white px-4 py-2 rounded-md mx-2"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )
            }
        </div>
    );
};

export default ManageCategories;
