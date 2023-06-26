'use client'

import { ICar } from '@/types'
import { calcCarRent } from '@/utils'
import Image from 'next/image'
import React, { useState } from 'react'
import CustomButton from '../common/CustomButton'
import CarDetails from './CarDetails'
import { generateCarImageUrl } from '@/api'

interface ICarCard {
    car: ICar
}

const CarCard: React.FC<ICarCard> = ({car}) => {

   const carRent = calcCarRent(car.city_mpg, car.year) 
   const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='flex flex-col p-6 justify-center items-start text-black-100 bg-primary-blue-100 hover:bg-white hover:shadow-md rounded-3xl group'>
        <div className='w-full flex justify-between items-start gap-2'>
            <h2 className='text-[22px] leading-[26px] font-bold capitalize'>{car.make} {car.model}</h2>
        </div>
        <p className='flex mt-6 text-[32px] font-extrabold'>
            <span className='self-start text-[14px] font-semibold'>
                $
            </span>
            {carRent}
            <span className='self-end text-[14px] font-semibold'>
                /day
            </span>
        </p>

        <div className='relative w-full h-40 my-3 object-contain'>
            <Image src={generateCarImageUrl(car)} alt='carModel' fill priority className='object-contain' />
        </div>

        <div className='relative flex w-full mt-2'>
            <div className='flex group-hover:invisible w-full justify-between text-gray-600'>
                <div className='flex flex-col justify-center items-center gap-2'>
                    <Image src='/steering-wheel.svg' width={20} height={20} alt='steering-wheel' />
                    <p className='text-[14px] '>{car.transmission === 'a' ? 'Automatic' : 'Manual'}</p>
                </div>

                <div className='flex flex-col justify-center items-center gap-2'>
                    <Image src='/tire.svg' width={20} height={20} alt='tire' />
                    <p className='text-[14px] '>{car.drive.toUpperCase()}</p>
                </div>

                <div className='flex flex-col justify-center items-center gap-2'>
                    <Image src='/gas.svg' width={20} height={20} alt='gas' />
                    <p className='text-[14px] '>{car.city_mpg} MPG</p>
                </div>
            </div>

            <div className='hidden group-hover:flex absolute bottom-0 w-full z-10'>
                <CustomButton 
                title='View More' 
                cStyle='w-full py-[16px] rounded-full bg-primary-blue'
                tStyle='text-white text-[14px] leading-[17px] font-bold'
                rightIcon='/right-arrow.svg'
                handleClick={()=> setIsOpen(true)} />
            </div>
        </div>

        <CarDetails isOpen={isOpen} closeModal={() => setIsOpen(false)} car={car} />
    </div>
  )
}

export default CarCard