import React from 'react'
import { useNavigate } from 'react-router-dom'

const Quotes = ({quote}) => {
const navigate = useNavigate()

  return (
    <div className='flex gap-2 border-b-2 mb-20 pb-6 dark:text-green-950'>
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
  )
}

export default Quotes