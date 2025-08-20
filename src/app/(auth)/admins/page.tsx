import React from 'react'
import Link from 'next/link' 

const page = () => {
  const ButtonClassNames = 
  `
    flex justify-center
    w-4/12 h-fit bg-[#2B73F9] 
    text-white font-bold text-2xl p-2 rounded-sm
    hover:bg-[#1E4EA9] hover:cursor-pointer duration-100 ease-in-out
  `

  return (
    <>
    <div className="bg-white shadow-lg p-4 rounded col-span-1 row-span-2">Card 1</div>
    <div className="bg-white shadow-lg p-4 rounded col-span-1 row-span-2">Card 2</div>
    <div className="bg-white shadow-lg p-4 rounded col-span-1 row-span-2">Card 3</div>
    <div className="
    col-span-1 row-span-2
  bg-white 
    shadow-lg p-4 rounded 
    flex flex-col 
    ">
    </div>
    <div className="bg-white shadow-lg p-4 rounded col-span-2 row-span-2">Card 5</div>
    <div className="bg-white shadow-lg p-4 rounded col-span-2 row-span-4 flex flex-col">
      <div className='flex-1 flex flex-row gap-2 text-center'>
        <div className={ButtonClassNames}>
        <Link href='/create/admins'>Create Admin</Link>
      </div>
      <div className={ButtonClassNames}>
        <Link href='/create/admins'>Edit Admin</Link>
      </div>
      <div className={ButtonClassNames}>
        <Link href='/create/admins'>Update Admin</Link>
      </div>
      <div className={ButtonClassNames}>
        <Link href='/create/admins'>Delete Admin</Link>
      </div>
      </div>
    </div>
    <div className="bg-white shadow-lg p-4 rounded col-span-2 row-span-2">Card 6</div>
  </>
  )
}

export default page