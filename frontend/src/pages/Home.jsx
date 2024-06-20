import Popular from '@/components/home/Popular'
import SlideBanner from '@/components/home/SlideBanner'
import React from 'react'

const Home = () => {
  return (
    <>
    <section className='flex flex-col items-center md:px-[190px]'>
      <SlideBanner/>
      <Popular/>
    </section>
    </>
  )
}

export default Home