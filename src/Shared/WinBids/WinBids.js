import React from 'react'

export default function WinBids() {
  return (
    <div>

 <div>
    <h1 className='text-center mb-7 text-green-600 text-3xl font-semibold'>Winner</h1>
 </div>

        <div className="overflow-x-auto">
  <table className=" table table-zebra w-full px-5">
    {/* head */}
    <thead>
      <tr>
        
        <th className='text-left'>Bidder</th>
        <th>Product</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      <tr className='bg-slate-100  my-5'> 
         
        <td>
            <div className='flex justify-start items-start flex-col'>
            <img className='w-10 h-10 rounded-full' src='https://i.ibb.co/NFRvMnj/image.png' alt=''/>
            
            <p>tom latham</p>
            </div>
            
            </td>
        <td>
            <p>SPA steel</p>
            <p>Bid Amount:3000</p>
        </td>
        <td><p className='text-green-600'>Successfully</p></td>
      </tr>
      <hr className='mb-5'/>
      <tr className='bg-slate-100  my-5'> 
         
        <td>
            <div className='flex justify-start items-start flex-col'>
            <img className='w-10 h-10 rounded-full' src='https://i.ibb.co/NFRvMnj/image.png' alt=''/>
            
            <p>tom latham</p>
            </div>
            
            </td>
        <td>
            <p>SPA steel</p>
            <p>Bid Amount:3000</p>
        </td>
        <td><p className='text-green-600'>Successfully</p></td>
      </tr>
      <hr className='mb-5'/>
      <tr className='bg-slate-100  my-5'> 
         
        <td>
            <div className='flex justify-start items-start flex-col'>
            <img className='w-10 h-10 rounded-full' src='https://i.ibb.co/NFRvMnj/image.png' alt=''/>
            
            <p>tom latham</p>
            </div>
            
            </td>
        <td>
            <p>SPA steel</p>
            <p>Bid Amount:3000</p>
        </td>
        <td><p className='text-green-600'>Successfully</p></td>
      </tr>
     
    </tbody>
  </table>
</div>
    </div>
  )
}
