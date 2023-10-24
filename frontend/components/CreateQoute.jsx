import Sheet from 'react-modal-sheet';
import React,{ useState } from 'react';
import { useCanister } from "@connect2ic/react"
import { Toaster, toast } from 'react-hot-toast';

const CreateQoute = () => {
    const [qoute] = useCanister("qoute")

    const [text, setText] = useState('');
    const [selectedTheme, setSelectedTheme] = useState('red'); // Use state to track the selected theme
    const [isOpen, setOpen] = useState(false);



    const handleColorChange = (theme) => {
      setSelectedTheme(theme); // Update the selected theme
    };
  
    const isThemeActive = (theme) => {
      return selectedTheme === theme; // Check if the theme is selected
    };

    const handleTextareaChange = (e) => {
        setText(e.target.value);
      };

      const content = {
        theme: selectedTheme,
        like: true,
        qoute_text: text,
        tags: [''],
        published: true,
      }

  const handleSubmit = async () => {
    try {
        setSelectedTheme('red');
        setText('');
        setOpen(false);
        toast.success('Successfully Created.');
        const res = await qoute.create(content);
    } catch (error) {
        console.error("An error occurred:", error);
    }
}


  return (
    <>
    <button className='bg-gray-900 font-semibold text-white py-3 px-6 text-lg rounded-full hover:scale-[103%] ease-in-out delay-200 duration-500' onClick={() => setOpen(true)}>Create Your Own</button>
      <Toaster />
    <Sheet isOpen={isOpen} onClose={() => setOpen(false)}>
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content className='p-5'>
            <h1 className='text-5xl font-bold text-center mb-5'>Write Quote</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5 h-full'>
                <div className='flex justify-center items-center'>
                    <div className={`w-[300px] h-[450px] rounded-2xl bg-${selectedTheme}-300`}>
                        <div className='flex flex-col justify-center items-center w-full h-full px-4 py-8 text-center'>
                            <h1 className='text-lg font-semibold text-slate-800 break-all'>"{text}"</h1>
                            <h1 className='text-sm font-semibold italic text-slate-700'></h1>
                        </div>
                    </div>
                </div>
                <div className='flex justify-center items-center w-full'>
                    <div className='flex flex-col gap-3 w-2/3'>
                        <div className='flex flex-wrap gap-2'>
                            <div
                                className={`w-12 h-12 rounded-full border-2 p-1 ${
                                isThemeActive('red') ? 'border-slate-400' : 'border-slate-200'
                                }`}
                                onClick={() => handleColorChange('red')}
                            >
                                <div className='w-full h-full bg-red-300 rounded-full cursor-pointer'></div>
                            </div>
                            <div
                                className={`w-12 h-12 rounded-full border-2 p-1 ${
                                isThemeActive('rose') ? 'border-slate-400' : 'border-slate-200'
                                }`}
                                onClick={() => handleColorChange('rose')}
                            >
                                <div className='w-full h-full bg-rose-300 rounded-full cursor-pointer'></div>
                            </div>
                            <div
                                className={`w-12 h-12 rounded-full border-2 p-1 ${
                                isThemeActive('teal') ? 'border-slate-400' : 'border-slate-200'
                                }`}
                                onClick={() => handleColorChange('teal')}
                            >
                                <div className='w-full h-full bg-teal-300 rounded-full cursor-pointer'></div>
                            </div>
                            <div
                                className={`w-12 h-12 rounded-full border-2 p-1 ${
                                isThemeActive('emerald') ? 'border-slate-400' : 'border-slate-200'
                                }`}
                                onClick={() => handleColorChange('emerald')}
                            >
                                <div className='w-full h-full bg-emerald-300 rounded-full cursor-pointer'></div>
                            </div>
                            <div
                                className={`w-12 h-12 rounded-full border-2 p-1 ${
                                isThemeActive('green') ? 'border-slate-400' : 'border-slate-200'
                                }`}
                                onClick={() => handleColorChange('green')}
                            >
                                <div className='w-full h-full bg-green-300 rounded-full cursor-pointer'></div>
                            </div>
                            <div
                                className={`w-12 h-12 rounded-full border-2 p-1 ${
                                isThemeActive('orange') ? 'border-slate-400' : 'border-slate-200'
                                }`}
                                onClick={() => handleColorChange('orange')}
                            >
                                <div className='w-full h-full bg-orange-300 rounded-full cursor-pointer'></div>
                            </div>
                            <div
                                className={`w-12 h-12 rounded-full border-2 p-1 ${
                                isThemeActive('amber') ? 'border-slate-400' : 'border-slate-200'
                                }`}
                                onClick={() => handleColorChange('amber')}
                            >
                                <div className='w-full h-full bg-amber-300 rounded-full cursor-pointer'></div>
                            </div>
                            <div
                                className={`w-12 h-12 rounded-full border-2 p-1 ${
                                isThemeActive('yellow') ? 'border-slate-400' : 'border-slate-200'
                                }`}
                                onClick={() => handleColorChange('yellow')}
                            >
                                <div className='w-full h-full bg-yellow-300 rounded-full cursor-pointer'></div>
                            </div>
                            <div
                                className={`w-12 h-12 rounded-full border-2 p-1 ${
                                isThemeActive('fuchsia') ? 'border-slate-400' : 'border-slate-200'
                                }`}
                                onClick={() => handleColorChange('fuchsia')}
                            >
                                <div className='w-full h-full bg-fuchsia-300 rounded-full cursor-pointer'></div>
                            </div>
                            <div
                                className={`w-12 h-12 rounded-full border-2 p-1 ${
                                isThemeActive('purple') ? 'border-slate-400' : 'border-slate-200'
                                }`}
                                onClick={() => handleColorChange('purple')}
                            >
                                <div className='w-full h-full bg-purple-300 rounded-full cursor-pointer'></div>
                            </div>
                            
                            
                            <div
                                className={`w-12 h-12 rounded-full border-2 p-1 ${
                                isThemeActive('violet') ? 'border-slate-400' : 'border-slate-200'
                                }`}
                                onClick={() => handleColorChange('violet')}
                            >
                                <div className='w-full h-full bg-violet-300 rounded-full cursor-pointer'></div>
                            </div>
                            <div
                                className={`w-12 h-12 rounded-full border-2 p-1 ${
                                isThemeActive('pink') ? 'border-slate-400' : 'border-slate-200'
                                }`}
                                onClick={() => handleColorChange('pink')}
                            >
                                <div className='w-full h-full bg-pink-300 rounded-full cursor-pointer'></div>
                            </div>
                            <div
                                className={`w-12 h-12 rounded-full border-2 p-1 ${
                                isThemeActive('indigo') ? 'border-slate-400' : 'border-slate-200'
                                }`}
                                onClick={() => handleColorChange('indigo')}
                            >
                                <div className='w-full h-full bg-indigo-300 rounded-full cursor-pointer'></div>
                            </div>
                            <div
                                className={`w-12 h-12 rounded-full border-2 p-1 ${
                                isThemeActive('blue') ? 'border-slate-400' : 'border-slate-200'
                                }`}
                                onClick={() => handleColorChange('blue')}
                            >
                                <div className='w-full h-full bg-blue-300 rounded-full cursor-pointer'></div>
                            </div>
                           
                            
                            <div
                                className={`w-12 h-12 rounded-full border-2 p-1 ${
                                isThemeActive('sky') ? 'border-slate-400' : 'border-slate-200'
                                }`}
                                onClick={() => handleColorChange('sky')}
                            >
                                <div className='w-full h-full bg-sky-300 rounded-full cursor-pointer'></div>
                            </div>
                            
                           
                            <div
                                className={`w-12 h-12 rounded-full border-2 p-1 ${
                                isThemeActive('gray') ? 'border-slate-400' : 'border-slate-200'
                                }`}
                                onClick={() => handleColorChange('gray')}
                            >
                                <div className='w-full h-full bg-gray-300 rounded-full cursor-pointer'></div>
                            </div>
                        </div>
                        <textarea className='w-full border-2 border-gray-200 rounded-2xl p-3' rows={'4'} placeholder='Write Qoute' value={text} onChange={handleTextareaChange}></textarea>
                        <div className='flex justify-center items-center gap-3'>
                            <button className='bg-gray-900 font-semibold text-white py-3 px-6 text-lg rounded-full hover:scale-[103%] ease-in-out delay-200 duration-500' onClick={handleSubmit}>Submit</button>
                            <button className='bg-gray-100 font-semibold text-black py-3 px-6 text-lg rounded-full hover:scale-[103%] ease-in-out delay-200 duration-500' onClick={() => setOpen(false)}>Close</button>
                        </div>
                    </div>
                
                </div>
            </div>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </Sheet>
  </>
  )
}

export default CreateQoute