import React, { useState } from "react";
import { useForm } from "react-hook-form";
import upload_area from "../assets/admin_assets/upload_area.png";
import {toast} from "react-toastify"

const ProductUpload = () => {
    
    const { register, handleSubmit, watch, setValue, reset } = useForm();
    const [imagePreviews, setImagePreviews] = useState([null, null, null, null]);

    const onSubmit = async (data) => {
      
      try{

          console.log(data)
          const formData = new FormData();
          formData.append("name", data.name);
          formData.append("description", data.description);
          formData.append("category", data.category);
          formData.append("subCategory", data.subCategory);
          formData.append("brand", data.brand);
          formData.append("price", data.price);
          formData.append("bestSeller", data.bestSeller);
          
          
          // Append sizes as JSON string
          formData.append("sizes", JSON.stringify(data.sizes));
  
          // Append images
          for(let i=0; i<4; i++){
              
              if(data[`image${i + 1}`]){

                formData.append(`image${i + 1}`, data[`image${i + 1}`]);

              }

          }

          console.log([...formData])
  
          const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/product/add`, {
              method: "POST",
              body: formData,
              // headers: {

              //   "Content-Type": "multipart/form-data"

              // },
              credentials: "include",
          });
  
          if(response.ok){

            toast.success("Product Added Sucessfully")
            reset()
            setImagePreviews(()=>[null, null, null, null])
            
          }
      }

      catch(error){

        console.log("Error:", error);
      }

    };
  

    const handleImageUpload = (index, event) => {
      
      if(event.target.files.length === 0) return; // Prevent errors if no file is selected
    
      const file = event.target.files[0];
      console.log("Selected file:", file);
    
      if(file){

        const reader = new FileReader();
        reader.onload = () => {
          
          setImagePreviews((prevPreviews) => {
            const newPreviews = [...prevPreviews];
            newPreviews[index] = reader.result;
            return newPreviews;
          });
    
          // Ensure the input is properly set in react-hook-form
          setValue(`image${index + 1}`, file, { shouldValidate: true });
        };
    
        reader.readAsDataURL(file);
      }
    };
    

    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-start gap-3 w-[70%] mt-5 ml-5"
      >
        <div>
          <p className="mb-2 text-gray-600 font-semibold">Upload Product Images (4 images)</p>
          <div className="flex gap-4">
            {[...Array(4)].map((_, index) => (
              <div key={index}>
                <label htmlFor={`image${index + 1}`} className="cursor-pointer">
                  <img
                    className="w-20 border rounded-lg border-gray-400"
                    src={imagePreviews[index] || upload_area}
                    alt={`Upload Image ${index + 1}`}
                  />
                </label>
                <input
                  type="file"
                  id={`image${index + 1}`}
                  className="hidden"
                  accept="image/*"
                  {...register(`image${index + 1}`)}
                  onChange={(e) => handleImageUpload(index, e)}
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="name" className="block text-gray-700 font-semibold">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full p-2 border rounded-lg border-gray-400"
            {...register("name", { required: true })}
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-gray-700 font-semibold">
            Description
          </label>
          <textarea
            id="description"
            className="w-52 p-3 border rounded-lg border-gray-400"
            rows="4"
            {...register("description", { required: true })}
          ></textarea>
        </div>

        <div>
          <label htmlFor="category" className="block text-gray-700 font-semibold">
            Category
          </label>
          <select
            id="category"
            className="w-full p-2 border rounded-lg border-gray-400 text-gray-600"
            {...register("category", { required: true })}
          >
            <option value="">Select Category</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Accessories">Accessories</option>
          </select>
        </div>

        <div>
          <label htmlFor="subCategory" className="block text-gray-700 font-semibold">
            Subcategory
          </label>
          <select
            id="subCategory"
            className="w-full p-2 border rounded-lg border-gray-400 text-gray-600"
            {...register("subCategory", { required: true })}
          >
            <option value="">Select SubCategory</option>
            <option value="smartphones">Smartphones</option>
            <option value="Laptops">Laptops</option>
            <option value="WinterWear">Winterwear</option>
            <option value="BottomWear">Bottomwear</option>
            <option value="SummerWear">Summerwear</option>
            <option value="TopWear">Topwear</option>
            <option value="Jeans">Jeans</option>
            <option value="Cameras">Cameras</option>
            <option value="Mobiles">Mobiles</option>
            <option value="Speaker">Speakers</option>
            <option value="Telivision">Telivision</option>
            <option value="Watch">Watch</option>
            <option value="HardDisks">HardDisks</option>
            <option value="HeadPhones">HeadPhones</option>
          </select>
        </div>

        <div>
          <label htmlFor="brand" className="block text-gray-700 font-semibold">
            Brand
          </label>
          <select
            id="subcategory"
            className="w-full p-2 border rounded-lg border-gray-400 text-gray-600"
            {...register("brand", { required: true })}
          >
            <option value="">Select Brand</option>
            <option value="Allen Solly">Allen Solly</option>
            <option value="Pepe Jeans">Pepe Jeans</option>
            <option value="Raymond">Raymond</option>
            <option value="Zara">Zara</option>
            <option value="H&M">H&M</option>
            <option value="Panasonic">Panasonic</option>
            <option value="Samsung">Samsung</option>
            <option value="Mac">Mac</option>
            <option value="LG">LG</option>
            <option value="Boat">Boat</option>
            <option value="Sony">Sony</option>
            <option value="Seagate">Seagate</option>
            <option value="WD Blue">WD Blue</option>
          </select>
        </div>
          
          <label htmlFor="price " className="text-gray-700 font-semibold">Price</label>
          <input class="w-full border-gray-400  rounded-md border px-3 py-2 sm:w-[120px]" id="price" type="Number" placeholder="25"  {...register("price")}/>
        
        <div>
          <label className="block text-gray-700 font-semibold">Product Sizes</label>
          <div className="flex flex-row gap-1">
            {["S", "M", "L", "XL"].map((size) => (
              <label key={size} className="flex items-center gap-1">
                <input type="checkbox" value={size} {...register("sizes")} />
                {size}
              </label>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="bestSeller"
            className="h-5 w-5"
            {...register("bestSeller")}
          />
          <label htmlFor="bestSeller" className="text-gray-700">
            Bestseller
          </label>
        </div>

        <div className="flex justify-end mt-3 mb-3 hover:transform hover:scale-105 hover:ease-in-out">
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg cursor-pointer ">
            Submit
          </button>
        </div>
      </form>
    );
};

export default ProductUpload;
