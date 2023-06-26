'use client'

import { ICustomFilter } from '@/types'
import React, { Fragment, useEffect, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'

const CustomFilter: React.FC<ICustomFilter> = ({ title, options }) => {

  const [selected, setSelected] = useState(options[0])
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

  const handleUpdateParams = (e: {title: string, value: string}) => {
    updateSearchParams(title, e.value.toLowerCase())
  }

  const updateSearchParams = (type: string, value: string) => {
    const currentParams = searchParams.toString()
    const params = new URLSearchParams(currentParams)
    console.log(window.location.search)
    console.log(currentParams)

    params.set(type, value)

    if (currentParams === params.toString()) return

    localStorage.setItem('persistentScroll', window.scrollY.toString())

    const newPathname = `${window.location.pathname}?${params.toString()}`

    router.push(newPathname)
  }

  return (
    <div className='w-fit'>
      <Listbox value={selected} onChange={(e) => {
        setSelected(e)
        handleUpdateParams(e)
      }}>
        <div className='relative w-fit z-10'>
          <Listbox.Button className='relative w-full min-w-[127px] flex justify-between items-center cursor-default rounded-lg bg-white py-2 px-3 text-left shadow-md sm:text-sm border'>
            <span className='block truncate'>{selected.title}</span>
            <Image src='/chevron-up-down.svg' width={20} height={20} className='object-contain ml-4' alt='chevron-up-down' />
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'>
            <Listbox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
              {options.map((option) => (
                <Listbox.Option key={option.title} value={option} className={({ active }) => `relative cursor-default select-none py-2 px-4 ${active ? 'bg-primary-blue text-white' : 'text-gray-900'}`}>
                  {({ selected }) => (
                    <span className={`block truncate ${selected ? 'font-bold' : 'font-normal'}`}>
                      {option.title}
                    </span>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>

          </Transition>
        </div>
      </Listbox>

    </div>
  )
}

export default CustomFilter