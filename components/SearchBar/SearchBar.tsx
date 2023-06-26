'use client'

import React, { useEffect, useState } from 'react'
import SearchManufacturer from './SearchManufacturer'
import SearchButton from './SearchButton'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import SearchModel from './SearchModel'

const SearchBar = () => {

    const [manufacturer, setManufacturer] = useState('')
    const [model, setModel] = useState('')
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


    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (manufacturer === '' && model === '')
            return alert('Please fill in the search bar')

        updateSearchParams(model.toLowerCase(), manufacturer.toLowerCase())
    }

    const updateSearchParams = (model: string, manufacturer: string) => {
        const currentParams = searchParams.toString()
        const params = new URLSearchParams(currentParams)
        console.log(window.location.search)
        console.log(currentParams)

        model ? params.set('model', model) : params.delete('model')
        manufacturer ? params.set('manufacturer', manufacturer) : params.delete('manufacturer')
        params.delete('limit')

        if (currentParams === params.toString()) return

        localStorage.setItem('persistentScroll', window.scrollY.toString())

        const newPathname = `${window.location.pathname}?${params.toString()}`

        router.push(newPathname)
    }

    return (
        <form
            className='flex items-center justify-start max-sm:flex-col w-full relative max-sm:gap-4 max-w-3xl'
            onSubmit={handleSearch}>
            <div className='flex-1 max-sm:w-full flex justify-start items-center relative'>
                <SearchManufacturer manufacturer={manufacturer} setManufacturer={setManufacturer} setModel={setModel} />
                <SearchButton cStyle='sm:hidden' />
            </div>
            <div className='flex-1 max-sm:w-full flex justify-start items-center relative'>
                <SearchModel manufacturer={manufacturer} model={model} setModel={setModel} />
                {/* <Image src='/model-icon.png' alt='model-icon' width={25} height={25} className='absolute w-[20px] h-[20px] ml-4' />
                <input
                    type="text"
                    name='model'
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    placeholder='Tiguan'
                    className='w-full h-[48px] pl-12 p-4 bg-light-white rounded-r-full max-sm:rounded-full outline-none cursor-pointer text-sm'
                /> */}
                <SearchButton cStyle='sm:hidden' />
            </div>
            <SearchButton cStyle='max-sm:hidden' />
        </form>
    )
}


export default SearchBar