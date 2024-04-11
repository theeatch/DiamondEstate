import React from 'react'

const page = () => {
  return (
    <div className='w-full h-full flex flex-col items-center justify-center mt-4'>
        <h1 className='text-5xl font-semibold text-blue-500'>House Price Prediction</h1>
        <div className='mt-10 border-2 border-gray-500 p-8 rounded-xl flex flex-col gap-6 w-1/2'>
          <div className='text-2xl font-semibold'>House Size Sq.Ft</div>
          <input className='border-2 border-gray-500 p-2 rounded-xl'></input>
          <div className='text-2xl font-semibold'>Number of Bedroomst</div>
          <input className='border-2 border-gray-500 p-2 rounded-xl'></input>
          <div className='text-2xl font-semibold'>Number of Bathrooms</div>
          <input className='border-2 border-gray-500 p-2 rounded-xl'></input>
          <div className='text-2xl font-semibold'>Year Ago</div>
          <input className='border-2 border-gray-500 p-2 rounded-xl'></input>
          <div className='text-2xl font-semibold'>Distance from City Center</div>
          <input className='border-2 border-gray-500 p-2 rounded-xl'></input>

          <button className='p-4 rounded-xl bg-blue-500  mx-auto text-white hover:scale-110 font-semibold duration-300'> Predict Price</button>
        </div>
    </div>
  )
}

export default page