import React, { useState } from 'react'
import Login from './Login'
import SignUp from './SignUp';

const Home = () => {

    const [isLogin, setIsLogin] = useState(false);

    return (
        <div>
            <div className=" w-full h-screen bg-amber-200 flex flex-col justify-center items-center gap-4">
                <div className='flex items-center'>
                    <h1 className='text-4xl'>Welcome</h1>
                    <img className='h-14' src="https://static.vecteezy.com/system/resources/thumbnails/020/995/195/small_2x/3d-minimal-turn-on-notification-concept-new-update-reminder-new-notification-alert-a-bell-icon-ringing-3d-illustration-png.png" alt="" />
                </div>
                <div className="w-sm min-h-98 bg-amber-50 rounded-2xl">
                    {
                        isLogin?(<Login/>):(<SignUp/>)
                    }

                    <p className="text-center mt-0 mb-6">
                        {isLogin ? "Don't have an account?" : "Already have an account?"}
                        <button onClick={() => setIsLogin(!isLogin)} className="ml-2 text-blue-500 underline">
                            {isLogin ? "Sign Up" : "Login"}
                        </button>
                    </p>
                </div>
            </div>

        </div>
    )
}

export default Home
