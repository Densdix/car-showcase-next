'use client'

import { modelFamilyList } from '@/constants'
import { ISearchModel } from '@/types'
import { Combobox, Transition } from '@headlessui/react'
import Image from 'next/image'
import React, { Fragment, useEffect, useState } from 'react'

const SearchModel: React.FC<ISearchModel> = ({ manufacturer, model, setModel }) => {

    const [query, setQuery] = useState('')

    let manufacturerModel = modelFamilyList.find(el => el.make === manufacturer.toLowerCase().replace(' ', '-'))

    console.log(manufacturerModel)
    console.log(manufacturer.toLowerCase().replace(' ', '-'))

    useEffect(()=> {
        manufacturerModel = modelFamilyList.find(el => el.make === manufacturer.toLowerCase().replace(' ', '-'))
    }, [manufacturer])

    return (
        <div className='flex-1 max-sm:w-full flex justify-start items-center'>
            <Combobox value={model} onChange={setModel}>
                <div className='relative w-full z-30'>
                    <Combobox.Button className='absolute top-[14px]'>
                        <Image src='/model-icon.png' width={20} height={20} className='ml-4' alt='car logo' />
                    </Combobox.Button>
                    <Combobox.Input
                        className='w-full h-[48px] pl-12 p-4 bg-light-white rounded-r-full max-sm:rounded-full outline-none cursor-pointer text-sm'
                        placeholder='Model'
                        displayValue={(model: string) => model}
                        onChange={(e) => setQuery(e.target.value)}>
                    </Combobox.Input>

                    <Transition
                        as={Fragment}
                        leave='transition ease-in duration-100'
                        leaveFrom='opacity-0'
                        afterLeave={() => setQuery('')}
                    >
                        <Combobox.Options className='absolute mt-1 max-h-72 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm' >
                            {manufacturerModel?.values === undefined ? (
                                <Combobox.Option
                                    value={query}
                                    className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                                    Model '{query}' didn't found!
                                </Combobox.Option>
                            )
                                : manufacturerModel?.values!.map((model) => (
                                    <Combobox.Option
                                        key={model}
                                        value={model}
                                        className={({ active }) => `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-primary-blue text-white' : 'text-gray-900'}`}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <span
                                                    className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                        }`}
                                                >
                                                    {model}
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

export default SearchModel