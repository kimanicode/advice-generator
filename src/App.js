import { useState,useEffect } from 'react';
import dice from './assets/icon-dice.svg'
import patternDesktop from './assets/pattern-divider-desktop.svg'
import patternMobile from './assets/pattern-divider-mobile.svg'

function App() {
  const [advice, setAdvice] = useState('');
  const [adviceId, setAdviceId] = useState('');


  const isMobile = window.innerWidth <= 375;


  
  const fetchAdvice = async () => {
    try {
     
      const response = await fetch('https://api.adviceslip.com/advice');
      const data = await response.json();
      console.log(data)

     
      setAdvice(data.slip.advice);
      setAdviceId(data.slip.id);

    } catch (error) {
      console.error('Error fetching advice:', error);
    }
  };
  useEffect(() => {
    
     
    fetchAdvice();
  }, []);

  const handleNextAdvice = () => {
    // Fetch the next advice when the button is clicked
    fetchAdvice();
  };

  return (
    <div className="bg-darkGrayishBlue flex h-screen  justify-center relative w-full  ">
      
      <div className='bg-grayishBlue text-white basis-3/4 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md text-[28px]  p-2'>
        <div className='text-center text-neonGreen'> Advice #{adviceId}</div>

        <div className='text-lightCyan p-2 '>
          <p>"{advice}"</p>
        </div>
        
        <div className='flex  items-center justify-center py-6'>

          {isMobile? (
             <img src={patternMobile}  alt ='pattern'/>
          ): ( <img src={patternDesktop}  alt ='pattern'/>)}
        
        
        </div>


        <div className='absolute  mt-[-5px] bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-neonGreen flex justify-center p-2 w-[40px] flex justify-center items-center rounded-full hover:animate-pulse ' onClick={handleNextAdvice}> <img  className='' src= {dice} /></div>
          
      </div>
      
    </div>
  );
}

export default App;
