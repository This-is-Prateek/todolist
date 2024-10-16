import React, { forwardRef, useRef, useState } from 'react'

const InputBar = forwardRef((props, ref) => {
    const sbmt =useRef();
    const handleSubmit = (e)=>{  //submits user input and prevents page from refreshing
        e.preventDefault();
        sbmt.current.click();
    }

    const handleChange =(e)=>{     //handles input change
        props.settodo(e.target.value);
    }

    return (
        <div className='bg-orange-200 text-gray-700 w-3/4 min-h-14 rounded-full flex max-md:h-4'>
            <div className='w-full'>
                <form onSubmit={(e)=>{handleSubmit(e)}} className='w-full h-full'>
                    <input onChange={(e)=>{handleChange(e)}} value={props.todo} ref={ref} type="text" className='w-full h-full bg-transparent rounded-l-full pl-5 max-md:text-sm' placeholder='What do you need to do?' />
                </form>
            </div>
            <div onClick={props.addbtn} ref={sbmt} className="addBtn w-1/5 bg-gray-700 rounded-r-full text-white font-bold flex items-center justify-center text-2xl cursor-pointer hover:bg-gray-500 max-md:text-sm">
                <div>ADD</div>
            </div>
        </div>
    )
});

export default InputBar;