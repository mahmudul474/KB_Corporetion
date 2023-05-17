import React from 'react'
import how1 from "../../../assets/how1.png"
import how2 from "../../../assets/how2.png"
import how3 from "../../../assets/how3.png"

export default function HowToWork() {
  return (
    <div className='bg-slate-200 m-auto rounded-lg mt-20  sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8'>
  
   <div className='p-10 py-16'>
   <div className='text-left '>
        <h1 className='text-3xl font-semibold'>How It Works</h1>
        <h3 className='text-gray-500 text-lg'>Easy 3 steps to win</h3>
    </div>


    <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 m-auto'>
        <div className='flex justify-center items-center flex-col'>
             
             <div>
                <img  className='w-full h-full' src={how1} alt=''/>
             </div>
            <div className='mt-3'>
                <h2  className='text-2xl font-semibold capitalize'>Sign Up</h2>
                <h3 className='text-xl text-gray-500'>No Credit Card Required</h3>
            </div>
        </div>
        <div className='flex justify-center items-center flex-col'>
             
             <div>
                <img  className='w-full h-full' src={how2} alt=''/>
             </div>
            <div className='mt-3'>
                <h2  className='text-2xl font-semibold capitalize'>Bid</h2>
                <h3 className='text-xl text-gray-500'>Bidding is free Only pay if you win</h3>
            </div>
        </div>
        <div className='flex justify-center items-center flex-col'>
             
             <div>
                <img  className='w-full h-full' src={how3} alt=''/>
             </div>
            <div className='mt-3'>
                <h2  className='text-2xl font-semibold capitalize'>Win</h2>
                <h3 className='text-xl text-gray-500'>Fun - Excitement - Great deals</h3>
            </div>
        </div>
         
    </div>

   </div>



    </div>
  )
}
