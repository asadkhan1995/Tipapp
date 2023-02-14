import React  from 'react';
import './App.css';
import logo from './img/logo.svg';
import dollar from './img/dollar.svg';
import person from './img/person.svg';
import { useState ,useEffect } from 'react';

function App() {
  const [bill , setBill] = useState(0);
  const [percent , setPercent] = useState(0);
  const [customPercentage, setCustomPercentage] = useState();
  const [numPeople , setNumPeople] = useState(0);
  const [tip , setTip] = useState(0);
  const [totalAmount , setTotalAmount] = useState(0);

  const handlechange = (e) =>{
    setBill(e.target.value)
  }
  const handlechangenumPeople = (e) =>{
    setNumPeople(e.target.value);
  }
  const handleCustomPercentage = (event) => {
    setCustomPercentage(event.target.value);
  };
  

  
  useEffect(() => {
    const calculatedTipAmount = parseFloat(bill) * (parseFloat(customPercentage) || percent) / 100;
    setTip(calculatedTipAmount);
    //Below single line code is to use to calculateTotalAmount and controll NaN and infinity problem.
    const calculatedTotalAmount = numPeople == 0 ? 0 : (parseFloat(bill) + calculatedTipAmount) / numPeople;
    setTotalAmount(calculatedTotalAmount);
  }, [bill, customPercentage, percent, numPeople]);
    
  // to controll NaN and infinity problem
   const totalAmountPerPerson = isNaN(totalAmount / numPeople) ? 0 : (totalAmount).toFixed(2);;

  const Reset = () => [
    setBill(0),
    setPercent(0),
    setNumPeople(0),
    setTip(0),
    setTotalAmount(0),
    setCustomPercentage({placeholder:"custom"})
  ]
  
  return (
    <div className="App max-w-xs sm:max-w-2xl mx-auto">
      <div className='flex justify-center py-6 mt-24'>
        <img src={logo} alt='logo'></img>
      </div>
      <div className='bg-white border rounded-2xl shadow-md px-4 py-6 sm:grid sm:grid-cols-2 sm:gap-8'>
        <div className='text-left w-full text-xs font-semibold tracking-widest text-cyan-700'>
          <p className='py-2'>Bill</p>
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
              <img className="w- h-3 text-gray-200 dark:text-gray-300" src={dollar} alt="dollar"/>
            </div>
            <input  type="number" value={bill} onChange={handlechange} placeholder='0' className="text-sm font-bold rounded-sm w-full pl-10 py-2 px-2 text-right bg-cyan-50 outline-none focus:ring-2 focus:ring-cyan-400"/>
          </div>
          <p>Select Tip %</p>
          <div className='mt-2 flex justify-between flex-wrap w-full text-white text-base'>
            <button value={percent} onClick={()=> setPercent(5)} className='bg-cyan-800 hover:bg-cyan-300 hover:text-cyan-800 focus:bg-cyan-600 py-1 w-20 md:w-24 mt-2 rounded-md shadow-md'>5%</button>
            <button value={percent} onClick={()=> setPercent(10)} className='bg-cyan-800 hover:bg-cyan-300 hover:text-cyan-800 focus:bg-cyan-600 py-1 w-20 md:w-24 mt-2 rounded-md shadow-md'>10%</button>
            <button value={percent} onClick={()=> setPercent(15)} className='bg-cyan-800 hover:bg-cyan-300 hover:text-cyan-800 focus:bg-cyan-600 py-1 w-20 md:w-24 mt-2 rounded-md shadow-md'>15%</button>

            <button value={percent} onClick={()=> setPercent(25)} className='bg-cyan-800 hover:bg-cyan-300 hover:text-cyan-800 focus:bg-cyan-600 py-1 w-20 md:w-24 mt-2 rounded-md shadow-md'>25%</button>
            <button value={percent} onClick={()=> setPercent(50)} className='bg-cyan-800 hover:bg-cyan-300 hover:text-cyan-800 focus:bg-cyan-600 py-1 w-20 md:w-24 mt-2 rounded-md shadow-md'>50%</button>
            <input  type="number" value={customPercentage} onChange={handleCustomPercentage} placeholder='Custom' className='text-right text-black py-1 px-2 w-20 md:w-24 mt-2 rounded-md shadow-md outline-none focus:ring-2 focus:ring-cyan-400 placeholder:text-cyan-700 placeholder:text-center placeholder:font-semibold'/>
          </div>
          <div className='flex justify-between py-2 mt-4'>
            <p className=''>Number of people</p>
            {numPeople <= 0 || "" ? 
             <p className="text-red-600 dark:text-red-500">Can't be or less then 0</p>
            :
              ""
            }
          </div>
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
              <img className="w- h-3 text-gray-200 dark:text-gray-300" src={person} />
            </div>
            <input type="number" value={numPeople} onChange={handlechangenumPeople} placeholder='0' className="text-sm font-bold rounded-sm w-full pl-10 py-2 px-2 text-right bg-cyan-50 outline-none focus:ring-2 focus:ring-cyan-400"/>
          </div>
        </div>
        {/* part 2 */}
        <div className='bg-cyan-900 w-full rounded-lg shadow-md px-6 py-6 font-semibold text-xs'>
          <div className='flex justify-between py-4'>
            <div className='text-white text-left'>
              <p>Tip Amount</p>
              <p className='text-cyan-700'>&#47;  person</p>
            </div>
            <div className='text-cyan-400 font-bold text-4xl'>
              <p>${tip}</p>
            </div>
          </div>
          <div className='flex justify-between py-4 mt-4'>
            <div className='text-white text-left'>
              <p>Total Amount</p>
              <p className='text-cyan-700'>&#47; person</p>
            </div>
            <div className='text-cyan-400 font-bold text-4xl'>
              <p>${isNaN(totalAmountPerPerson) || totalAmountPerPerson == Infinity
                ? ""
                : totalAmountPerPerson}
              </p>
            </div>
          </div>
          <button onClick={Reset}  className='w-full py-2 mt-20 text-white bg-cyan-700 rounded-md tracking-wider  hover:bg-cyan-100 hover:text-black focus:bg-cyan-400'>RESET</button>
        </div>
      </div>
    </div>
  );
}

export default App;
