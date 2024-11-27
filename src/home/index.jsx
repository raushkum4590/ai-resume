import Header from '@/components/custom/Header'
import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/clerk-react'
import { ArrowBigLeft, ArrowBigRightIcon, AtomIcon, Download, Edit, LinkedinIcon, Share } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'


const Home = () => {
  const navigate=useNavigate();
  return (
    <div>
      <Header/>
      <div className='p-3 my-4'>
      {/* Featured Section */}
     <header className='text-4xl text-center font-bold'>Build your Resume  <span className='text-blue-600'> With AI</span></header>
     <p className='text-gray-400 text-2xl text-center p-2'>Effortlessely Craft a Standout Resume With Our AI-powered Builder</p>
     </div>
     
     <div className="flex items-center justify-center ">
     <button
      onClick={() => navigate('/dashboard')}
      className="flex items-center bg-purple-600 text-white px-4 py-2 rounded-md shadow-lg hover:bg-purple-700"
    >
      Get Started
      <ArrowBigRightIcon className="ml-2" />
    </button>
</div>
<section className="py-8 bg-white z-50 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
<h2 className="font-bold text-3xl">How it Works?</h2>
<h2 className="text-md text-gray-500">Give mock interview in just 3 simplar easy step</h2>

<div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      <a
        className="block rounded-xl border bg-white
         border-gray-200 p-8 shadow-xl transition
         hover:border-pink-500/10 hover:shadow-pink-500/10"
        href="#"
      >
       <AtomIcon className='h-8 w-8'/>

        <h2 className="mt-4 text-xl font-bold text-black">Write promot for your form</h2>

        <p className="mt-1 text-sm text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ut quo possimus adipisci
          distinctio alias voluptatum blanditiis laudantium.
        </p>
      </a>

      <a
        className="block rounded-xl border bg-white border-gray-200 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
        href="#"
      >
      <Edit className='h-8 w-8'/>

        <h2 className="mt-4 text-xl font-bold text-black">Edit Your form </h2>

        <p className="mt-1 text-sm text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ut quo possimus adipisci
          distinctio alias voluptatum blanditiis laudantium.
        </p>
      </a>

      <a
        className="block rounded-xl border bg-white border-gray-200 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
        href="#"
      >
      <Share className='h-8 w-8' />

        <h2 className="mt-4 text-xl font-bold text-black">Share & Start Accepting Responses</h2>

        <p className="mt-1 text-sm text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ut quo possimus adipisci
          distinctio alias voluptatum blanditiis laudantium.
        </p>
      </a>

    
    </div>

    <div className="mt-12 text-center">
      <a
        href="/sign-in"
        className="inline-block rounded bg-pink-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-pink-700 focus:outline-none focus:ring focus:ring-yellow-400"
      >
        Get Started Today
      </a>
    </div>
    </section>

    </div>
  )
}

export default Home