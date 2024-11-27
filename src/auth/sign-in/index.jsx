import { SignIn } from '@clerk/clerk-react'
import React from 'react'

const SignInPage = () => {
  return (
    <div className='flex justify-center items-center h-screen '>
        <SignIn/>
    </div>
  )
}

export default SignInPage