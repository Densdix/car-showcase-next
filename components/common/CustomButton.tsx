'use client'

import React from 'react'
import Image from 'next/image'
import { ICustomButton } from '@/types'

const CustomButton: React.FC<ICustomButton> = ({ title, cStyle, handleClick, btnType, tStyle, rightIcon, isDisabled }) => {
  return (
    <button
      disabled={false}
      type={btnType || "button"}
      className={`flex flex-row relative justify-center items-center py-3 px-6 outline-none ${cStyle}`}
      onClick={handleClick}
    >
      <span className={`flex-1 ${tStyle}`}>{title}</span>
      {rightIcon && (
        <div className='relative w-6 h-6'>
          <Image src={rightIcon} alt='rightIcon' fill className='object-contain' />
        </div>
      )}
    </button>
  )
}

export default CustomButton