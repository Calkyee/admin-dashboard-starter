import React, {useEffect, useState} from 'react'
import { motion } from 'framer-motion'

type Props =  { 
  children: React.ReactNode
  position: string;
}
const duration: number = 0.75;

const AnimatePageSwapping = ({children, position}: Props) => {
  const [animateIn, setAnimateIn] = useState(false); 

  useEffect(()=>{
    const timeout = setTimeout(()=> setAnimateIn(true), 2); 

    return ()=> clearTimeout(timeout); 
  }, []); 

  return (
    <div className='col-span-4 row-span-4 grid grid-cols-4 grid-rows-4 overflow-hidden'>
      <motion.div
        layout
        transition={{ duration: duration, ease: "easeInOut" }}
        className={`
        ${animateIn ? `col-span-4 row-span-4` : `${position} col-span-1 row-span-1`}
        `
        }
      >
        <motion.div
          layout
          initial={{scale: 0.75}}
          animate={{scale: 1}}
          transition={{duration: duration, ease: 'easeInOut'}}
          className="h-full bg-white rounded shadow-lg flex flex-col p-4"
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  )
}

export default AnimatePageSwapping