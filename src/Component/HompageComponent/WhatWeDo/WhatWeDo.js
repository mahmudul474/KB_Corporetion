import React from 'react'
import bg from "../../../assets/2021-09-15.jpg"
import shape from "../../../assets/footer-top-shape.png"
export default function WhatWeDo() {
  return (
    <div c     className="bg-no-repeat relative bg-center my-20  bg-cover	"
      style={{ backgroundImage: `url(${shape })` }}>
      <div className='px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8'>
       <div className='flex justify-between items-center  flex-col lg:flex-row '>
        <div className='w-full relative flex  flex-col px-5'>

      <h1 className='lg:text-[80px] z-50  text-[40px] leading-[50px]' ><span className='text-green-500 mr-16'>What</span> <br/> <span className="ml-16"> We  do</span> </h1>

     
      <div className='flex justify-end items-end '>
        <img className='lg:w-2/4   hidden lg:block lg:h-60 ' src={bg}/>
      </div>

         


        </div>



        <div className='w-full text-left pl-3 pr-10 shadow-md py-10'>
         <h2 className='text-xl font-bold mb-20 text-left
          '>WORKLIFE SOLUTIONS FOR ALL. WE INSPIRE WHAT COULD BE, AND HELP MAKE IT A REALITY.</h2>


         <div className='my-10'>
            <h4 className='text-xl font-bold mb-4 text-green-600 text-left '>Product</h4>
            <p>It’s not about just ordering supplies anymore. It’s about discovering better ways to get the job done. We’ll help you find solutions in the categories that matter most: business essentials, technology, facilities and breakroom, furniture, print and promotional products. And browse The Loop to discover new products thoughtfully designed for the way you work today.</p>

           <span>Learn more in <a className='text-green-500 underline' href='https://kbsteel.business.site/website/kbsteel/#posts' >KB Corporation</a></span>

         </div>

        </div>
       </div>


      </div>
    </div>
  )
}
