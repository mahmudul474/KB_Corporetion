import React, { useEffect, useState } from "react";
import Product from "../../Shared/ProductCard/Product";
 import crBg from "./assates/cr.jpg";

 export default function Cr() {
   const [products, setProducts] = useState([]);

   useEffect(() => {
     fetch(`${process.env.REACT_APP_API_URL}/products/category/cr`)
       .then(res => res.json())
       .then(data => {
         setProducts(data);
       });
   }, []);

   return (
     <div>
       <div
         style={{
           backgroundImage: `url(${crBg})`
         }}
         className="h-[200px]  bg-opacity-50 flex flex-col justify-center items-start px-4 "
       >
         <div className="py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
           <div>
             <h1 className="text-2xl text-white capitalize  font-semibold">
               Live Actions
             </h1>
           </div>
           <div className="text-sm breadcrumbs text-white">
             <ul>
               <li>
                 <a>Category</a>
               </li>
               <li>
                 <a>CR</a>
               </li>
               <li>Product</li>
             </ul>
           </div>
         </div>
       </div>

       <div class="bg-white">
         <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
           <h2 class="text-2xl   text-left font-bold tracking-tight text-gray-900">
             CR (Cold Rolled) Steel Coils and Sheets
           </h2>
           <p className="text-black hidden lg:block text-left">
             Explore our premium selection of Cold Rolled (CR) steel coils and
             sheets, renowned for their smooth surface finish and precise
             dimensions. These high-quality steel products are ideal for
             applications that demand superior surface quality, tight
             tolerances, and excellent formability. Whether for manufacturing,
             construction, or other industries, our CR steel ensures reliability
             and performance in every project.
           </p>

           <div className="divider w-full my-3 h-[2px] text-black bg-black"></div>

           <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
             {products?.map(product => (
               <Product data={product} key={product._id}></Product>
             ))}
           </div>
         </div>
       </div>
     </div>
   );
 }
