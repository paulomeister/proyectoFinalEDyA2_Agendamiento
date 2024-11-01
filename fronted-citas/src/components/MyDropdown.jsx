import { useEffect, useRef } from 'react';
import { Dropdown } from 'flowbite';
import Franja from './Franja'

function MyDropdown({id, buttonId, valor, setValor, opciones}) {

    const triggerElRef = useRef(null);
    const targetElRef = useRef(null);

    useEffect(() => {
        
        const options = {

            placement: 'bottom',
            triggerType: 'click',
            offsetSkidding: 0,
            offsetDistance: 10,
            delay: 300
            
        }

        const dropdown = new Dropdown(targetElRef.current, triggerElRef.current, options);

        return () => {
        dropdown.destroy()
        }

    }, []);

  return (
    <>
      <button
        ref={triggerElRef}
        id={ buttonId }
        className="ml-2 text-black bg-slate-200 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
        data-dropdown-toggle="dropdownHover" 
        data-dropdown-trigger="hover"
      >
        { valor }
        <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
        </svg>
      </button>

      <div
        ref={targetElRef}
        id={ id }
        className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
      >
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby={buttonId}>
          {
          opciones.map((item, idx) => {

            return (<li key={idx} onClick={() => {
              
              setValor(item)
              document.getElementById(buttonId).click()
              
              }}>
              <Franja valor={item}/>
            </li>)  

          })
          }
        </ul>
      </div>
    </>
  );
}

export default MyDropdown;
