'use client'

import React from 'react'
import Image from 'next/image'
import CustomButton from '../common/CustomButton'

const Hero = () => {
    const handleScroll = () => {
        const nextSection = document.getElementById("discover");

        if (nextSection) {
            nextSection.scrollIntoView({ behavior: "smooth" });
        }
    }

    return (
        <div className='flex xl:flex-row flex-col gap-5 relative z-0 max-w-[1440px] mx-auto'>
            <div className='flex-1 sm:pt-36 pt-24 sm:px-16 px-6'>
                <h1 className='2xl:text-[72px] sm:text-[64px] text-[36px] font-extrabold'>
                Find the best rental prices cars -- quickly and easily.
                </h1>

                <p className='sm:text-[27px] text-[24px] text-black-100 font-light mt-5'>
                Save on car rentals when you plan your trip!
                </p>

                <CustomButton
                    title="Explore cars"
                    cStyle='bg-primary-blue text-white rounded-full mt-10'
                    handleClick={handleScroll} />
            </div>

            <div className='xl:flex-[1.5] flex justify-end items-end w-full xl:h-screen'>
                <div className='relative xl:w-full w-[90%] xl:h-full h-[590px] max-sm:h-[450px] z-0 max-sm:-mt-[80px]'>
                    <Image src="/hero3.png" alt='hero' fill className='object-contain' />
                </div>
                <div className='absolute xl:-top-24 xl:-right-1/2 -right-1/4 bg-hero-bg bg-repeat-round -z-10 w-full xl:h-screen h-[590px] max-sm:h-[450px] overflow-hidden'></div>
            </div>
        </div>
    )
}

export default Hero