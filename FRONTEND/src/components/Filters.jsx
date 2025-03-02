import React, {useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { ShopContext } from "../contexts/ShopContext";

const Filters = () => {


    const {setCategory, setBrand, setType} = useContext(ShopContext)
    const { register, watch } = useForm({
      
      defaultValues: { 
        category: [], 
        type: [], 
        brand: [] 
      }
    
    });

    const selectedCategories = watch("category", []);
    // console.log(selectedCategories)
    const selectedTypes = watch("type", []);
    // console.log(selectedTypes)
    const selectedBrands = watch("brand", []);
    // console.log(selectedBrands)

    useEffect(() => {
      
      setCategory(selectedCategories);
      setType(selectedTypes)
      setBrand(selectedBrands);

    }, [selectedCategories, selectedTypes, selectedBrands]);

    const categoryOptions = [
      
      { value: "Clothing", label: "Clothing" },
      { value: "Electronics", label: "Electronics" },
    
    ];

    const typeOptions = {
      Clothing: [
        { value: "TopWear", label: "Top Wear" },
        { value: "BottomWear", label: "Bottom Wear" },
        { value: "WinterWear", label: "Winter Wear" },
        { value: "SummerWear", label: "Summer Wear" },
      ],
      Electronics: [
        { value: "Telivision", label: "Television" },
        { value: "watch", label: "Watches" },
        { value: "Laptops", label: "Laptops" },
        { value: "Speakers", label: "Speakers" },
        { value: "Mobiles", label: "Mobiles" },
        { value: "HardDisks", label: "HardDisks" },
        { value: "KeyBoards", label: "KeyBoards" },
        { value: "Mouse", label: "Mouse" },
      ],
    };

    const brandOptions = {
      Clothing: [
        { value: "Allen Solly", label: "Allen Solly" },
        { value: "Peter England", label: "Peter England" },
        { value: "Raymond", label: "Raymond" },
        { value: "Prada", label: "Prada" },
        { value: "Nike", label: "Nike" },
        { value: "Puma", label: "Puma" },
        { value: "Adidas", label: "Adidas" },
        { value: "Zara", label: "Zara" },
        { value: "GAP", label: "GAP" },
        { value: "Pepe Jeans", label: "Pepe Jeans" },
      ],
      Electronics: [
        { value: "Apple", label: "Apple" },
        { value: "Samsung", label: "Samsung" },
        { value: "LG", label: "LG" },
        { value: "Vivo", label: "Vivo" },
        { value: "HP", label: "HP" },
        { value: "JBL", label: "JBL" },
        { value: "Mac", label: "Mac" },
      ],
    };

  return (
    <>
      <div className="w-56 flex flex-col gap-5">
        
        <p className="my-2 text-xl flex items-center cursor-pointer gap-2">FILTERS</p>

        {/* Categories */}
        <div className="categories flex border border-gray-200 flex-col p-4 gap-1">
          
          <p className="text-sm font-bold">Categories</p>
          {categoryOptions.map(({ value, label }) => (
            <div key={value}>
              
              <input type="checkbox" value={value} {...register("category")} />
              <label> {label}</label>
            
            </div>
          ))}

        </div>

        {/* Types */}
        {selectedCategories.map((category) => (
          
          <div key={category} className="type flex border border-gray-200 flex-col p-4 gap-1">
           
            <p className="text-sm font-bold">Type - {category.charAt(0).toUpperCase() + category.slice(1)}</p>
            {typeOptions[category]?.map(({ value, label }) => (
              
              <div key={value}>
                
                <input type="checkbox" value={value} {...register("type")} />
                <label> {label}</label>
                
              </div>
            ))}
          </div>

        ))}

        {/* Brands */}
        {selectedCategories.map((category) => (
          
          <div key={category} className="brands flex border border-gray-200 flex-col p-4 gap-1">
            
            <p className="text-sm font-bold">Brands - {category.charAt(0).toUpperCase() + category.slice(1)}</p>
            
            {brandOptions[category]?.map(({ value, label }) => (
              <div key={value}>
                
                <input type="checkbox" value={value} {...register("brand")} />
                <label> {label}</label>
              
              </div>
            ))}

          </div>

        ))}

      </div>

    </>

  );
};

export default Filters;
