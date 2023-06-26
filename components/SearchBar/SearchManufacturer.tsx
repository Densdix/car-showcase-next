'use client'

import { manufacturers } from '@/constants'
import { ISearchManufacturer } from '@/types'
import { Combobox, Transition } from '@headlessui/react'
import Image from 'next/image'
import React, { Fragment, useEffect, useState } from 'react'

const SearchManufacturer: React.FC<ISearchManufacturer> = ({ manufacturer, setManufacturer, setModel }) => {

    const [query, setQuery] = useState('')

    useEffect(()=> {
        setModel('') 
    }, [manufacturer])

    const filteredCars =
        query === ''
            ? manufacturers
            : manufacturers.filter((car) => {
                return car.toLowerCase().includes(query.toLowerCase())
            })

    return (
        <div className='flex-1 max-sm:w-full flex justify-start items-center'>
            <Combobox value={manufacturer} onChange={setManufacturer}>
                <div className='relative w-full z-20'>
                    <Combobox.Button className='absolute top-[14px]'>
                        <Image src='/car-logo.svg' width={20} height={20} className='ml-4' alt='car logo' />
                    </Combobox.Button>
                    <Combobox.Input
                        className='w-full h-[48px] pl-12 p-4 rounded-l-full max-sm:rounded-full bg-light-white outline-none cursor-pointer text-sm'
                        placeholder='Audi'
                        displayValue={(manufacturer: string) => manufacturer}
                        onChange={(e) => setQuery(e.target.value)}>
                    </Combobox.Input>

                    <Transition
                        as={Fragment}
                        leave='transition ease-in duration-100'
                        leaveFrom='opacity-0'
                        afterLeave={() => setQuery('')}
                    >
                        <Combobox.Options className='absolute mt-1 max-h-72 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                            {filteredCars.length === 0 && query !== "" ? (
                                <Combobox.Option
                                    value={query}
                                    className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                                    Car '{query}' not exist!
                                </Combobox.Option>
                            )
                                : filteredCars.map((car) => (
                                    <Combobox.Option
                                        key={car}
                                        value={car}
                                        className={({ active }) => `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-primary-blue text-white' : 'text-gray-900'}`}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <span
                                                    className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                        }`}
                                                >
                                                    {car}
                                                </span>
                                                {selected ? (
                                                    <span
                                                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-teal-600'
                                                            }`}
                                                    >
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Combobox.Option>
                                ))}
                        </Combobox.Options>
                    </Transition>
                </div>
            </Combobox>
        </div>
    )
}

export default SearchManufacturer