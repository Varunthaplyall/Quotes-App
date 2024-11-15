import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom'

const Quotes = ({quote, user, updateQuote,deleteQuote}) => {
const {pathname } = useLocation();
const [edit, setEdit] = useState(false);
const [editedText, setEditedText] = useState(quote.text)

async function saveHandler() {
    try {
        const res = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/v1/quotes/${quote._id}`, {text : editedText}, {
            headers : {
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }})
        if(res.status == 200){
            updateQuote(res.data)
            toast.success("updated sucessfully")
            setEdit(false)
        } 
    } catch (error) {
        toast.error(error.response.data.message)
    }
}


async function deleteHandler() {
    try {
        const res = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/v1/quotes/${quote._id}`, {
            headers : {
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
        })
       
        if(res.status == 200){
            deleteQuote(res.data)
        }

    } catch (error) {
        toast.error(error.response.data.message)
    }
}

  return (
<>

    {pathname == '/' && 
        <div className=' flex gap-2 border-b-2 mb-20 pb-6 dark:text-green-950'>
        <div 
        className='border-2 w-10 h-10 rounded-full font-semibold flex justify-center items-center shrink-0 cursor-pointer hover:bg-green-200 '
        >
         {`${quote.author.userName.split(' ')[0][0]} ${quote.author.userName.split(' ')[1][0]}`} 
       </div>

       <div className='grow '>
           <p>
               {`“ ${quote.text}”`}
           </p>
           <p className='text-sm pl-5 font-semibold'>
               {`― ${quote.author.userName}`}
           </p>
       </div>
   </div>
    }

    {pathname == '/profile' && 
        <div className='pt-5 font-merriweather flex flex-col gap-2 border-b-2 mb-6 pb-6 dark:text-green-950 mt-24'>
        <div className='flex items-start gap-2'>
            <div className='border-2 w-10 h-10 rounded-full font-semibold flex justify-center items-center shrink-0 cursor-pointer hover:bg-green-200'>
                {`${user.userName.split(' ')[0][0]} ${user.userName.split(' ')[1][0]}`}
            </div>

            <div className='grow'>
                {edit ? 
                    <textarea
                    onChange={(e)=>setEditedText(e.target.value)}
                    className={`border-2 w-full pt-3 ps-3`}
                    value={editedText}
                    ></textarea> :
                <p>{`“ ${quote.text}”`}</p>
                }
            </div>
        </div>

        <div className='flex gap-4 justify-end mt-auto'>

            <span 
            onClick={()=>{
                setEdit(prev => !prev)
            }}
            className='text-sm cursor-pointer hover:underline'>
                {edit ? "Cancel" : "Edit"}
            </span>
            
            {edit ? <span onClick={()=> {saveHandler()}} className='text-sm cursor-pointer hover:underline'>Save</span> :
            <span  onClick={()=> (deleteHandler())} className='text-sm cursor-pointer hover:underline'>Delete</span>
            }

        </div>
    </div>
    }

</>
  )
}

export default Quotes