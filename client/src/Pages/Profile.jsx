import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const Profile = ({user}) => {
const [userQuotes, setUserQuotes] = useState([])
    async function fetchData() {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/me`, {
                headers:{
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
            })
           if(res.status == 200){
            setUserQuotes(res.data.quotes)
           }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }


    useEffect(()=>{
        fetchData()
    },[])

  return (
    <>
        {userQuotes.map((quote, index) => (
        <div key={index} className='pt-24 font-merriweather flex flex-col gap-2 border-b-2 mb-6 pb-6 dark:text-green-950'>   
            <div className='flex items-start gap-2'>
                <div className='border-2 w-10 h-10 rounded-full font-semibold flex justify-center items-center shrink-0 cursor-pointer hover:bg-green-200'>
                    {`${user.userName.split(' ')[0][0]} ${user.userName.split(' ')[1][0]}`}
                </div>

                <div className='grow'>
                    <p>{`“ ${quote.text}”`}</p>
                    <p className='text-sm pl-5 font-semibold'>{`― ${user.userName}`}</p>
                </div>
            </div>

            <div className='flex gap-4 justify-end mt-auto'>
                <span className='text-sm cursor-pointer hover:underline'>Edit</span>
                <span className='text-sm cursor-pointer hover:underline'>Delete</span>
            </div>
        </div>
        ))}
    </>
  )
}

export default Profile