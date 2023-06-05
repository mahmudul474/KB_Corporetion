import React, { useEffect, useState } from "react";
import Animation from "../../../Shared/Animation/Animation";

export default function Users() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/users`)
      .then(res => res.json())
      .then(data => {
        setUsers(data);
      });
  }, []);




 const handlemakeAdmin = id => {
   fetch(`${process.env.REACT_APP_API_URL}/user/admin/${id}`,{
    method:"PUT"
   })
   .then(res=>res.json())
   .then(data=>{
      console.log(data)
   })
 };

 return (
   <div className="">
     <h1 className="capitalize text-2xl m-4 font-bold"> users</h1>

     <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
       <div class="flex items-center justify-between pb-4 bg-white dark:bg-gray-900">
         <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
           <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
             <tr>
               <th scope="col" class="px-6 py-3">
                 user
               </th>
               <th scope="col" class="px-6 py-3">
                 Phone Number
               </th>
               <th scope="col" class="px-6 py-3">
                 Make seller
               </th>
               <th scope="col" class="px-6 py-3">
                 Make Admin
               </th>
               <th scope="col" class="px-6 py-3">
                 Action
               </th>
               <th scope="col" class="px-6 py-3">
                 Edit
               </th>
             </tr>
           </thead>
           {users?.map(user => (
             <tbody>
               <tr class="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                 <th
                   scope="row"
                   class="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                 >
                   <img
                     class="w-10 h-10 rounded-full"
                     src={user?.userPhoto}
                     alt="user photo"
                   />
                   <div class="pl-3">
                     <div class="text-base font-semibold">{user?.name}</div>
                     <div class="font-normal text-gray-500">{user?.email}</div>
                   </div>
                 </th>
                 <td class="px-6 py-4">{user?.phoneNumber}</td>
                 <td class="px-6 py-4">
                   <div class="flex items-center">
                     <div class="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div>{" "}
                     Make seller
                   </div>
                 </td>
                 <td class="px-6 py-4">
                   <div class="flex items-center">
                     <div class="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div>{" "}
                     <button onClick={() => handlemakeAdmin(user?._id)}>
                       Make Admin
                     </button>
                   </div>
                 </td>
                 <td class="px-6 py-4">
                   <a
                     href="#"
                     class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                   >
                     Active
                   </a>
                 </td>
                 <td class="px-6 py-4">
                   <a
                     href="#"
                     class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                   >
                     X
                   </a>
                 </td>
               </tr>
             </tbody>
           ))}
         </table>
       </div>
     </div>
   </div>
 );
}
