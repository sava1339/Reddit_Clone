import React, { useEffect } from 'react';
import './styles/leftContent.css';

export default function LeftContent() {
    const publicUrl = window.location.origin + "/";
  return (
    <div className='text-white fixed left-0 flex flex-col w-[270px] min-h-[94vh] p-4 border-gray-600 border-r-[1px]'>
        <div className='category_active flex items-center hover_effect category_item rounded-[10px] pl-4 py-2'>
            <img className='w-6' src={publicUrl + "homeIcon.svg"} alt="" />
            <h2 className='pl-[12px]'>Home</h2>
        </div>
        <div className=' hover_effect flex items-center category_item rounded-[10px] pl-4 py-2'>
            <img className='w-6' src={publicUrl + "popularIcon.svg"} alt="" />
            <h2 className='pl-[12px]'>Popular</h2>
        </div>
        <div className='group_border border-b-[1px] w-full my-3 border-gray-600'></div>
    </div>
  )
}
