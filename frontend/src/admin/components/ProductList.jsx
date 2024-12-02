import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteProduct, getProduct, updateProduct } from "../api/product";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { groceryCategories, groceryMeasurements } from "../../helper/random";
import { FaSearch } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { openAddProduct } from "../features/addProductSlice";

const ProductList = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [editingProducts, setEditingProducts] = useState({});
  const dispatch = useDispatch();

  const { data, isLoading, isError } = useQuery(["products"], getProduct);

  const startEditing = (product) => {
    setEditingProducts((prev) => ({
      ...prev,
      [product._id]: {
        productName: product.productName,
        measurement: product.measurement,
        category: product.category,
        price: product.price,
        stock: product.stock,
      },
    }));
  };

  // Handle form changes for a specific product
  const handleFormData = (e, productId) => {
    const { name, value } = e.target;
    setEditingProducts((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [name]: name === "price" || name === "stock" ? Number(value) : value,
      },
    }));
  };

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      toast.success("Product Deleted");
    },
    onError: () => {
      toast.error("Failed to delete product");
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }) => {
      return await updateProduct(id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      toast.success("Product Updated");
    },
    onError: () => {
      toast.error("Failed to update product");
    },
  });

  const handleDeleteProduct = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteMutation.mutate(productId);
    }
  };

  const handleUpdateProduct = (productId) => {
    const updatedData = editingProducts[productId];
    if (updatedData) {
      updateMutation.mutate({ id: productId, data: updatedData });
    }
  };

  const handleAddProduct = () => {
    dispatch(openAddProduct(true));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <PulseLoader color="#0cc0df" size={15} />
      </div>
    );
  }

  // if (!data?.products?.length) {
  //   return (
  //     <div className="flex justify-center items-center h-screen w-full">
  //       <div>No products available</div>
  //     </div>
  //   );
  // }

  const filteredProducts = data.products.filter((product) =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container flex items-center gap-5">
      <div className="overflow-x-auto w-full">
        <div className="flex justify-between items-center mb-5">
          <div className="relative flex items-center w-full max-w-[60%] shadow-md rounded-full lg:max-w-xs">
            <input
              className="border-2 border-black w-full h-8 focus:outline-none rounded-full p-2 text-primaryGray md:h-full"
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="absolute inset-y-0 right-0 flex items-center text-primaryWhite border-y-2 border-right-2 border-black bg-primaryBlue text-sm py-1 px-5 rounded-full">
              <FaSearch />
            </button>
          </div>
          <button
            type="button"
            className="p-2 rounded-full bg-primaryBlue text-primaryWhite text-2xl border-2 border-black"
            onClick={() => handleAddProduct()}
          >
            <GoPlus />
          </button>
        </div>
        {!data?.products?.length ? (
          <div className="flex justify-center items-center h-screen w-full">
            <div>No products available</div>
          </div>
        ) : (
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-primaryBlue text-primaryWhite">
                <th className="p-2 text-left">Image</th>
                <th className="p-2 text-left">Product Name</th>
                <th className="p-2 text-left">Category</th>
                <th className="p-2 text-left">Measurement</th>
                <th className="p-2 text-left">₱ Price</th>
                <th className="p-2 text-left">Stock</th>
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => {
                const editingData = editingProducts[product._id];
                const isEditing = Boolean(editingData);

                return (
                  <tr
                    key={product._id}
                    className="hover:bg-gray-100 border border-primaryBlue"
                  >
                    <td className="p-2">
                      <img
                        src={product.image}
                        alt={product.productName}
                        className="h-12 w-12 shadow-md object-cover rounded"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="text"
                        name="productName"
                        className="shadow-md p-1 rounded-md text-xs w-full placeholder:text-black"
                        value={
                          isEditing
                            ? editingData.productName
                            : product.productName
                        }
                        onChange={(e) => handleFormData(e, product._id)}
                        onClick={() => !isEditing && startEditing(product)}
                      />
                    </td>
                    <td className="p-2">
                      <select
                        className="rounded-md shadow-md p-2 text-xs w-full"
                        name="category"
                        value={
                          isEditing ? editingData.category : product.category
                        }
                        onChange={(e) => handleFormData(e, product._id)}
                        onClick={() => !isEditing && startEditing(product)}
                      >
                        <option value="" disabled>
                          Select a category
                        </option>
                        {groceryCategories.map((category, index) => (
                          <option key={index} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-2">
                      <select
                        className="rounded-md shadow-md p-2 text-xs w-full"
                        name="measurement"
                        value={
                          isEditing
                            ? editingData.measurement
                            : product.measurement
                        }
                        onChange={(e) => handleFormData(e, product._id)}
                        onClick={() => !isEditing && startEditing(product)}
                      >
                        <option value="" disabled>
                          Select Measurement
                        </option>
                        {groceryMeasurements.map((measurement, index) => (
                          <option key={index} value={measurement}>
                            {measurement}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        name="price"
                        className="shadow-md p-1 text-xs rounded-md w-full placeholder:text-black"
                        value={isEditing ? editingData.price : product.price}
                        onChange={(e) => handleFormData(e, product._id)}
                        onClick={() => !isEditing && startEditing(product)}
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        name="stock"
                        className="shadow-md p-1 text-xs rounded-md w-full placeholder:text-black"
                        value={isEditing ? editingData.stock : product.stock}
                        onChange={(e) => handleFormData(e, product._id)}
                        onClick={() => !isEditing && startEditing(product)}
                      />
                    </td>
                    <td className="p-2">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          className="bg-primaryBlue text-primaryWhite rounded-md px-3 py-1 shadow-md hover:opacity-80 disabled:opacity-50"
                          onClick={() => handleUpdateProduct(product._id)}
                          disabled={!isEditing || updateMutation.isLoading}
                        >
                          <AiFillEdit />
                        </button>
                        <button
                          type="button"
                          className="bg-red-700 text-primaryWhite rounded-md px-3 py-1 shadow-md hover:opacity-80 disabled:opacity-50"
                          onClick={() => handleDeleteProduct(product._id)}
                          disabled={deleteMutation.isLoading}
                        >
                          <MdDelete />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ProductList;
