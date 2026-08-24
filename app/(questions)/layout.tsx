import React from 'react'

function layout({children}: {children: React.ReactNode}) {
  return (
    <div className="bg-white h-screen text-black w-screen flex flex-row justify-center">
      {children}
    </div>
  )
}

export default layout