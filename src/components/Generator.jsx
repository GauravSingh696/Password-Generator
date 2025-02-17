import React, { useCallback, useEffect, useState } from 'react'

const generator = () => {
    const [length, setLength] = useState('4');
    const [password, setPassword] = useState();
    const [number_allowed, setNumber_allowed] = useState(false);
    const [char_allowed, setChar_allowed] = useState(false);
    const [Copy, setCopy] = useState('copy');

    const char_update = () => {
        char_allowed==true ? setChar_allowed(false) : setChar_allowed(true);
        
    }

    const number_update = () => {
        number_allowed==true ? setNumber_allowed(false) : setNumber_allowed(true);
    }

    const CopyToClipboard = useCallback(()=> {
        window.navigator.clipboard.writeText(password);

        setCopy('copied')

        setTimeout(() => {
            setCopy('copy')
        }, 2000);
    }, [password])
    
    const generate_pass = useCallback(() => {
        let pass = ''
        let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let number = '1234567890';
        let spetial_char = '~!@#$%^&*';

        if(number_allowed) {
            str += number;
        }

        if(char_allowed) {
            str += spetial_char;
        }

        for(let i=0;i<length;i++) {
            let char = Math.floor(Math.random()*(str.length))
            pass += str[char];

            setPassword(pass);
        }
    },[length, setPassword, number_allowed, char_allowed])

    useEffect(()=>{
        generate_pass();
    },[length, number_allowed, char_allowed, setPassword])

  return (
    <>
      <div className='bg-gray-300 h-screen flex justify-center'>
        <div className='mt-30 w-[550px] rounded-xl p-4.5 h-fit bg-gray-400'>
          <div className='mb-2 w-full flex justify-between rounded h-9'>
            <div className='border-1 rounded-xl w-full p-2 cursor-text mr-1'>{password}</div>
            <button className='bg-blue-400 hover:bg-blue-600 rounded-xl w-20 cursor-pointer' onClick={CopyToClipboard}>{Copy}</button>
          </div>

          <div className='w-full flex justify-start rounded h-full'>
            <input type="range" value={length} onChange={(e)=>{setLength(e.target.value)}} min={6} max={40} className='cursor-pointer mr-1'/>
            <div className='w-27'><label htmlFor="" className='text-center mr-6'>Length ({length})</label></div>

            <input type="checkbox" className='mr-1 cursor-pointer' onChange={char_update}/>
            <label htmlFor="" className='mr-6'> Characters</label>

            <input type="checkbox" className='mr-1 cursor-pointer' onChange={number_update}/>
            <label htmlFor=""> Numbers</label>
          </div>

          <div className='flex justify-center w-full mt-5'>
           <button className='bg-blue-400 p-2 rounded-xl hover:bg-blue-600 cursor-pointer' onClick={generate_pass}>Generator new password</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default generator
