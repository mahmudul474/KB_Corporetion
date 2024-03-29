import React, { useEffect, useState } from "react";
import Product from "../../Shared/ProductCard/Product";
import { getAllProducts } from "../../api/allProduct";
import LoadingSpiner from "../../Shared/LoadingSpiner/LoadingSpiner";

export default function Action() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
    

   useEffect(() => {
     setLoading(true);
     getAllProducts()
       .then(data => {
         console.log(data);
         setProducts(data);
         setLoading(false);
       })
       .catch(err => console.log(err));
   }, []);

   if (loading) {
     return <LoadingSpiner></LoadingSpiner>;
   }

   ///paginetions

   return (
     <div className="px-4  py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
       <div className="flex justify-between flex-col lg:flex-row">
         <div className="grid grid-cols-1 lg:grid-cols-3 w-full  gap-5 ">
           {[...products]?.reverse().map(product => (
             <Product key={product._id} data={product}></Product>
           ))}
         </div>
       </div>
     </div>
   );
}
