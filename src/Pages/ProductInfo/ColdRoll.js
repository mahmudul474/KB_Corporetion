import React from 'react'
import bg  from "./hot-roolet.jpg"

export default function ColdRoll() {
  return (
    <div>
      <div
        style={{
          backgroundImage:
            `url(${bg})`,
        }}
        className="h-[200px] bg-opacity-50 flex flex-col justify-center items-start px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8"
      >
        <div>
          <h1 className="text-2xl capitalize  font-semibold">Live Actions</h1>
        </div>
        <div className="text-sm breadcrumbs">
          <ul>
            <li>
              <a>Home</a>
            </li>
            <li>
              <a>Documents</a>
            </li>
            <li>Add Document</li>
          </ul>
        </div>
      </div>

     
    </div>
  )
}
