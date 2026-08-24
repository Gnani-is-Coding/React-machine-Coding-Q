import React from 'react'
import Clock from './components/Clock'

function Timer() {

  return (
    <div className="flex flex-col items-center gap-4 mt-12">
      <img src="/assets/clock.gif" alt="Timer" className="rounded-full" height="150" width="150"/>
      <Clock />
    </div>
  )
}

export default Timer