import React from 'react'

const Loaders = () => {
    return (
        <div className='fixed w-screen h-screen bg-black opacity-70 z-[9999] flex justify-center items-center'>
            <div className='h-10 w-10  border bottom-8 border-solid animate-spin rounded-full border-t-transparent'></div>
        </div>
    )
}

export default Loaders;