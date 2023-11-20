import React from 'react';

const Product = () => {
  return (
    <div className="p-5">
      <table className="w-full bg-white border rounded-lg shadow-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left">Product</th>
            <th className="px-4 py-3 text-left">Category</th>
            <th className="px-4 py-3 text-left">Price</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-gray-50">
            <td className="px-4 py-3">Product 1</td>
            <td className="px-4 py-3">Category A</td>
            <td className="px-4 py-3">$10.99</td>
            <td className="px-4 py-3 text-green-500">In Stock</td>
            <td className="px-4 py-3">
              <button className="text-blue-500 hover:underline">Edit</button>
              <button className="text-red-500 hover:underline ml-2">Delete</button>
            </td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="px-4 py-3">Product 2</td>
            <td className="px-4 py-3">Category B</td>
            <td className="px-4 py-3">$19.99</td>
            <td className="px-4 py-3 text-red-500">Out of Stock</td>
            <td className="px-4 py-3">
              <button className="text-blue-500 hover:underline">Edit</button>
              <button className="text-red-500 hover:underline ml-2">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Product;