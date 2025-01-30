import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <>
            <div className='md:container z-50 bg-[#010113] sticky top-0 mx-auto border-b-2 border-gray-800 py-5 px-10 flex justify-between items-center'>
                <div className='text-white font-bold md:text-3xl sm:text-2xl  font-poppins'>AIImagica</div>
                <Link to='/generate-image' className='text-white cursor-pointer px-5 py-2 rounded-xl md:text-md sm:text-lg bg-gradient-to-r from-blue-600 to-purple-800 font-semibold '>Generate Image</Link>
            </div>
        </>
    )
}
