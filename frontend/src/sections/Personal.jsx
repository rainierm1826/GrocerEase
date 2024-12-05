import React, { useState } from "react";
import ProfileImage from "../components/ProfileImage";
import { useSelector } from "react-redux";
import { updateUser } from "../api/user";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUser } from "../features/userSlice";
import { IoMenu } from "react-icons/io5";
import { openSidebar } from "../features/sidebarSlice";

const Personal = () => {
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.user.user);

  const personalFields = [
    {
      id: "firstName",
      label: "First Name",
      placeholder: userInfo.user?.firstName || "Enter your first name",
    },
    {
      id: "lastName",
      label: "Last Name",
      placeholder: userInfo.user?.lastName || "Enter your first name",
    },
    {
      id: "middleName",
      label: "Middle Name",
      placeholder: userInfo.user?.middleName || "Enter your middle name",
    },
  ];

  const contactFields = [
    {
      id: "contactNumber",
      label: "Contact Number",
      placeholder: userInfo.user?.contactNumber || "Enter your contact number",
    },
    {
      id: "province",
      label: "Province",
      placeholder: userInfo.user.location?.province || "Enter your province",
    },
    {
      id: "city",
      label: "City",
      placeholder: userInfo.user.location?.city || "Enter your city",
    },
    {
      id: "barangay",
      label: "Barangay",
      placeholder: userInfo.user.location?.barangay || "Enter your barangay",
    },
    {
      id: "street",
      label: "Street",
      placeholder: userInfo.user.location?.street || "Enter your street",
    },
    {
      id: "blk",
      label: "BLK",
      placeholder: userInfo.user.location?.blk || "Enter your blk",
    },
    {
      id: "lot",
      label: "Lot",
      placeholder: userInfo.user.location?.lot || "Enter your lot",
    },
  ];

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    contactNumber: "",
    location: {
      province: "",
      city: "",
      barangay: "",
      street: "",
      blk: "",
      lot: "",
    },
  });

  const handleFormData = (e) => {
    const { name, value } = e.target;
    if (name in formData.location) {
      setFormData((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const filterEmptyFields = (data) => {
    if (typeof data === "object" && data !== null) {
      return Object.fromEntries(
        Object.entries(data)
          .filter(
            ([key, value]) =>
              value !== null &&
              value !== undefined &&
              String(value).trim() !== ""
          )
          .map(([key, value]) => [key, filterEmptyFields(value)])
      );
    }
    return data;
  };

  const handleUpdate = async () => {
    try {
      const filteredData = filterEmptyFields(formData);

      const updatedLocation = {
        ...userInfo.user.location,
        ...filteredData.location,
      };

      const updatedData = {
        ...filteredData,
        location: updatedLocation,
      };

      const data = {
        _id: userInfo.user._id,
        newProfile: updatedData,
      };

      if (data) {
        const response = await updateUser(data);
        dispatch(setUser(response));
        toast.success(response.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile");
    }
  };

  return (
    <form className=" w-full">
      <div className="flex justify-center flex-col">
        <div className="flex justify-center">
          <ProfileImage w={16} h={16} />
        </div>
        <div className="grid grid-cols-1 gap-5 mt-5 md:grid-cols-3">
          {personalFields.map((value) => (
            <div className="flex flex-col" key={value.id}>
              <label
                htmlFor={value.id}
                name={value.id}
                className="font-bold mb-2"
              >
                {value.label}
              </label>
              <input
                type="text"
                className="bg-gray-100 p-2 rounded-full shadow-md placeholder:text-black "
                placeholder={value.placeholder}
                onChange={(e) => handleFormData(e)}
                value={formData[value.id]}
                name={value.id}
              />
            </div>
          ))}
        </div>
        <hr className="my-5" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {contactFields.map((value) => (
            <div className="flex flex-col" key={value.id}>
              <label
                htmlFor={value.id}
                name={value.id}
                className="font-bold mb-2"
              >
                {value.label}
              </label>
              <input
                type="text"
                className="bg-gray-100 p-2 rounded-full shadow-md placeholder:text-black "
                placeholder={value.placeholder}
                value={formData[value.id]}
                onChange={(e) => handleFormData(e)}
                name={value.id}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-center md:justify-end">
          <button
            type="button"
            className="bg-primaryBlue text-primaryWhite mt-10 p-2 border-2 border-black rounded-full font-bold w-full max-w-xs"
            onClick={() => handleUpdate()}
          >
            Update
          </button>
        </div>
      </div>
    </form>
  );
};

export default Personal;
