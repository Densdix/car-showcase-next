'use client'

import { IShowMore } from '@/types'
import React, { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import CustomButton from '../common/CustomButton'

const ShowMore: React.FC<IShowMore> = ({isNext, pageNumber}) => {
const router = useRouter()
const searchParams = useSearchParams()

useEffect(() => {
    // Retrieve scrollY value from localStorage after routing
    const persistentScroll = localStorage.getItem('persistentScroll')
    if (persistentScroll === null) return

    // Restore the window's scroll position
    window.scrollTo({ top: Number(persistentScroll) })

    // Remove scrollY from localStorage after restoring the scroll position
    // This hook will run before and after routing happens so this check is
    // here to make we don't delete scrollY before routing
    if (Number(persistentScroll) === window.scrollY)
      localStorage.removeItem('persistentScroll')
  }, [searchParams])

const handleNavigation = () => {
    console.log(pageNumber)
    const newLimit = (pageNumber + 1) * 10
    updateSearchParams('limit', String(newLimit))
}

const updateSearchParams = (type: string, value: string) => {
    const currentParams = searchParams.toString()
    const params = new URLSearchParams(currentParams)
    console.log(window.location.search)
    console.log(currentParams)

    params.set(type, value)

    //if (currentParams === params.toString()) return

    localStorage.setItem('persistentScroll', window.scrollY.toString())

    const newPathname = `${window.location.pathname}?${params.toString()}`

    router.push(newPathname)
  }

  return (
    <div className='w-full flex-center gap-5 mt-10'>
        {!isNext && (
            <CustomButton title='Show More' btnType='button' cStyle='bg-primary-blue rounded-full text-white' handleClick={handleNavigation} />
        )}
    </div>
  )
}

export default ShowMore