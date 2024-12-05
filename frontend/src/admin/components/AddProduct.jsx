import React, { useState } from "react";
import { groceryMeasurements, groceryCategories } from "../../helper/random";
import { useQueries, useQueryClient, useMutation } from "@tanstack/react-query";
import { IoIosClose } from "react-icons/io";
import imagePreview from "../../assets/imagePreview.png";
import { toast } from "react-toastify";
import { addProduct } from "../api/product";
import { useDispatch } from "react-redux";
import { closeAddProduct } from "../features/addProductSlice";

const AddProduct = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [b64Image, setb64Image] = useState(null);
  const [formData, setFormData] = useState({
    productName: "",
    measurement: "",
    category: "",
    price: 0,
    stock: 0,
    description: "",
  });

  const handleCloseAddProduct = () => {
    dispatch(closeAddProduct(false));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImage(reader.result);
        setb64Image(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const mutation = useMutation({
    mutationFn: async () => {
      const { productName, category, price, stock, measurement, description } =
        formData;
      if (!productName || !category || !measurement || !description) {
        toast.error("All fields are required");
        return;
      }

      const result = await addProduct({
        b64Image,
        productName,
        category,
        price,
        stock,
        measurement,
        description,
      });
      setFormData({
        productName: "",
        measurement: "",
        category: "",
        price: 0,
        stock: 0,
        description: "",
      });
      setImage(null);

      if (result.data.status) {
        toast.success(result.data.message);
      } else {
        toast.error(result.data.message);
      }
    },
    onSuccess: () => {
      console.log("Data successfully saved!");
      queryClient.invalidateQueries(["products"]);
    },
    onError: (error) => {
      console.error("Error:", error);
    },
  });

  const handleAddProduct = () => {
    mutation.mutate({ name: "new-product" });
  };

  return (
    <div className="col-span-4 lg:col-span-3 shadow-lg rounded-md bg-primaryWhite">
      <div className="flex justify-between items-center px-5 py-2">
        <h4 className="font-bold text-2xl text-primaryBlue">Add Product</h4>
        <button
          type="button"
          className="text-2xl text-primaryBlue"
          onClick={() => handleCloseAddProduct()}
        >
          <IoIosClose />
        </button>
      </div>
      <div className="h-[calc(100vh-100px)] overflow-y-auto">
        {" "}
        {/* Make the form scrollable */}
        <form className="grid grid-cols-1 gap-5 p-6 lg:grid-cols-2">
          {/* Form Fields */}
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {/* Product Name */}
            <div className="flex flex-col">
              <label className="font-bold mb-2">Product Name</label>
              <input
                type="text"
                className="rounded-md shadow-md p-2 border border-gray-300 text-xs"
                placeholder="e.g. Sinandomeng"
                name="productName"
                onChange={(e) => handleFormData(e)}
                value={formData.productName}
              />
            </div>
            {/* Measurement */}
            <div className="flex flex-col">
              <label className="font-bold mb-2">Measurement</label>
              <select
                id="groceryMeasurement"
                className="rounded-md text-xs shadow-md p-2 border border-gray-300"
                name="measurement"
                onChange={(e) => handleFormData(e)}
                value={formData.measurement}
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
            </div>
            {/* Category */}
            <div className="flex flex-col">
              <label className="font-bold mb-2">Category</label>
              <select
                id="groceryCategory"
                className="rounded-md text-xs shadow-md p-2 border border-gray-300 focus:ring focus:ring-primaryBlue"
                name="category"
                onChange={(e) => handleFormData(e)}
                value={formData.category}
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
            </div>
            {/* Price */}
            <div className="flex flex-col">
              <label className="font-bold mb-2">₱ Price</label>
              <input
                type="number"
                className="rounded-md text-xs shadow-md p-2 border border-gray-300 focus:ring focus:ring-primaryBlue"
                placeholder="e.g. ₱100"
                name="price"
                onChange={(e) => handleFormData(e)}
                value={formData.price}
                min={0}
              />
            </div>
            {/* Stocks */}
            <div className="flex flex-col">
              <label className="font-bold mb-2">Stocks</label>
              <input
                type="number"
                className="rounded-md text-xs shadow-md p-2 border border-gray-300"
                placeholder="Number of stocks"
                name="stock"
                onChange={(e) => handleFormData(e)}
                value={formData.stock}
                min={0}
              />
            </div>
            {/* Description */}
            <div className="flex flex-col col-span-2">
              <label className="font-bold mb-2">Description</label>
              <textarea
                name="description"
                className="rounded-md shadow-md text-xs p-2 border border-gray-300 h-32"
                placeholder="Enter brief description..."
                onChange={(e) => handleFormData(e)}
                value={formData.description}
              ></textarea>
            </div>
          </div>
          {/* Image Upload */}
          <div className="flex justify-start items-center flex-col">
            <img
              src={image || imagePreview}
              className="object-cover rounded-md mt-2 h-40 w-40 shadow-md"
              alt="Preview"
            />
            <label
              htmlFor="image-upload"
              className="flex justify-center text-xs bg-primaryWhite mt-5 p-1 border-2 border-primaryBlue rounded-full font-medium max-w-xs cursor-pointer w-2/3 lg:w-1/3 text-center"
            >
              Upload Image
            </label>
            <input
              type="file"
              id="image-upload"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            {/* Submit Button */}
            <div className="flex justify-end items-end w-full col-span-2 h-full">
              <button
                type="button"
                className="bg-primaryBlue text-white mt-5 p-2 rounded-full font-bold w-full lg:w-1/3 hover:bg-primaryBlue-dark"
                onClick={() => handleAddProduct()}
              >
                Add Product
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
