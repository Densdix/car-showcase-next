import Image from 'next/image'
import React from 'react'

const SearchButton = ({cStyle}: {cStyle : string}) => {
  return (
    <button type='submit' className={`-ml-3 z-10 ${cStyle}`}>
        <Image src='/magnifying-glass.svg' alt='magnifying-glass' width={40} height={40} className='object-contain' />
    </button>
  )
}

export default SearchButton