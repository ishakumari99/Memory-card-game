import { useCanister } from "@connect2ic/react"
import React, { useEffect, useState } from "react"
import moment from "moment"
import {toast} from "react-hot-toast";

const QouteCard = ({data}) => {
    //console.log(data)
     // Function to convert Unix timestamp to a readable date
     const getDate = (timestamp) => {
        const converted = Number(timestamp) / 1000000;
        const date = new Date(converted);
        return `${date}`;
    };
  return (
    <div className={`w-full h-[400px] rounded-xl bg-${data[1]?.theme}-300`}>
        <div className='flex flex-col justify-center items-center w-full h-full px-4 py-8 text-center'>
            <h1 className='text-lg font-semibold text-slate-800'>"{data[1]?.qoute_text}"</h1>
{/*             <h1 className='text-sm font-semibold italic text-slate-700'>-- {data[1][0][0].author._arr[0]}</h1>
 */}            <h1 className='text-sm font-semibold italic text-slate-700'>{moment(getDate(data[1]?.time_updated)).fromNow()}</h1>
        </div>
    </div>
  )
}

export default QouteCard