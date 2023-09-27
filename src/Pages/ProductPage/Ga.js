import React, { useEffect, useState } from "react";
import Product from "../../Shared/ProductCard/Product";
import giBg from "./assates/gi.jpg";
import ProductBidding from "./singleProductDettails/ProductBidding";
export default function Ga() {
  const [products, setProducts] = useState([]);
  const [isloading,setIsloading]=useState(false)
  useEffect(() => {
    setIsloading(true)
    fetch(`${process.env.REACT_APP_API_URL}/products/category/ga`)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setIsloading(false);
      });
  }, []);

  if(isloading){
    return <div class="h-screen bg-white">
    <div class="flex justify-center items-center h-full">
      <img class="h-16 w-16" src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif" alt=""/>
    </div>
    </div>
    
   }

  // Get the last index
 const lastIndex = products.length - 1;
 // Get the last product
 const lastProduct = products[lastIndex];

  return (
    <div>
     

      <div className="bg-white">

        {lastProduct && <ProductBidding data={lastProduct}></ProductBidding>}
      
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl   text-left font-bold tracking-tight text-gray-900">
            GI/GA (Galvanized) Steel Coils and Sheets
          </h2>
          
          <div className="divider w-full my-3 h-[2px] text-black bg-black"></div>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {products?.map(product => (
              <Product data={product} key={product._id}></Product>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
