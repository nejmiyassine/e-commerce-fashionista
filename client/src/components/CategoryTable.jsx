import React from "react";

const CategoryTable = ({ category, onEdit, onDelete }) => {
    return (
        <div className="flex justify-between p-2">
            <span>{category.name}</span>
            <div>
                <button
                    onClick={() => onEdit(category)}
                    className="bg-blue-500 text-white px-2 py-1 rounded-md m-1"
                >
                    Edit
                </button>
                <button
                    onClick={() => onDelete(category._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded-md m-1"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default CategoryTable;
