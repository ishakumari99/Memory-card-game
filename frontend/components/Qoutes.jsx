import { useCanister, useConnect } from "@connect2ic/react";
import React, { useEffect, useState } from "react";
import QouteCard from './QouteCard';
import CreateQoute from "./CreateQoute";

const Quotes = () => {
    const [qoute] = useCanister("qoute");
    const [quotes, setQuotes] = useState([]);
    const { isConnected } = useConnect() 

    const listAllQuotes = async () => {
      try {
        const quotes = await qoute.list_all();
        setQuotes(quotes);
      } catch (error) {
        console.error("Error listing all quotes:", error);
      }
    };
    
  
    useEffect(() => {
      const interval = setInterval(() => {
        listAllQuotes();
      }, 1000); // Run every 1000 milliseconds (1 second)
    
      return () => {
        clearInterval(interval); // Clean up the interval when the component unmounts
      };
    }, []);
    //console.log(quotes.data, 'quotes');
   // console.log(quotes, 'quotes2');


  return (
    <div className='w-full bg-slate-50 h-[calc(100vh-95px)] mt-2 rounded-2xl p-3 overflow-auto'>
      <div className='flex justify-between items-center p-3 border-b-2 border-slate-100/80'>
        <h1 className='text-2xl text-slate-900 font-semibold'>Trending Quotes</h1>
        {isConnected ? <CreateQoute quotes={quotes} setQuotes={setQuotes} /> : ''}
      </div>
      <div className='p-3 grid grid-cols-1 md:grid-cols-5 gap-5 overflow-auto'>
       
        {quotes.map((item, index) => (
          <QouteCard key={index} data={item} />
        ))}
        
      </div>
    </div>
  );
};

export default Quotes;
