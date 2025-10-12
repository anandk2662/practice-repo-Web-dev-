import React from 'react'

const Navbar = () => {
  return (
    <div>
      <nav className='flex justify-between bg-[#344e41] text white'>
        <div className="logo font-bold text-white w-full mt-2 ml-2">
            <span>YourTask</span>
        </div>
        <ul className='flex gap-3'>
            <li className='cursor-pointer px-2 text-white hover:font-bold transition-all'>Home</li>
            <li className='cursor-pointer px-2 text-white hover:font-bold transition-all'>Yours Tasks</li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
