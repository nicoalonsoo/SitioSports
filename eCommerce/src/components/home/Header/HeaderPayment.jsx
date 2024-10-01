import React from 'react'
import { logoTransparent } from "../../../assets/images";
const HeaderPayment = () => {
  return (
    <div className='w-screen h-32 flex justify-center items-center'>
      <div className="w-full flex justify-center items-center">
        <a href="/" className='w-32 flex justify-center items-center'>
          <img className="w-full" src={logoTransparent} alt="" />
        </a>
      </div>
    </div>
  )
}

export default HeaderPayment
