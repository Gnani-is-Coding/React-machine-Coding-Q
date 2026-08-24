'use client'

import { getlocalStorageItem, setLocalStorageItem } from '@/utils'
import React, { useEffect, useRef, useState } from 'react'
import Button from './Button'
import { add, rotate } from '@/icons'
import Lap from './Lap'

const TIMER_KEY = "TIMER_VAL"
const DELAY = 10

export type ILaps = Record<string, number>[]
export type LapItem = Record<string, number>

function Clock() {
    const [time, setTime] = useState<number>(0) // in ms 
    const [isRunning, setRunning] = useState<boolean>(false)
    const [laps, setLaps] = useState<ILaps>([])
    const timerRef = useRef()

    function tick() {
        setTime(prevVal => prevVal += 1)
    }

    function handleStart() {
        console.log(isRunning)
        if (isRunning) return
        console.log("clicked +++")
        timerRef.current = setInterval(tick, DELAY)
        setRunning(true)
    }

    function handleStop() {
        setRunning(false)
        if (timerRef.current) clearInterval(timerRef.current)
    }

    function handleResume() {
        timerRef.current = setInterval(tick, DELAY)
        setRunning(true)
    }

    function handleReset() {
        if (timerRef.current) clearInterval(timerRef.current)
        setTime(0)
        setRunning(false)
        setLaps([])
    }
    const addToLap = () => {
        if (!isRunning) return

        const key = format(time)
        setLaps(prev => [...prev, { [key]: time }])
    }

    useEffect(() => {
        // localstorage
        const storeVal = Number(getlocalStorageItem(TIMER_KEY))
        const storedflag = getlocalStorageItem("isRunning") === "true" ? true : false

        if (storeVal) {
            setTime(storeVal)
        }
        console.log("storedflag", storedflag)
        if(storedflag) handleStart()
        setRunning(storedflag)

    }, [])

    useEffect(() => {
        return () => {
            setLocalStorageItem(TIMER_KEY, time)
            setLocalStorageItem("isRunning", isRunning)
        }
    }, [time, isRunning])

    function format(t: number) {
        const millisec = Math.round(t % 100) // (1 - 100)
        const sec = (Math.round(t / 100)) % 60
        const mins = Math.round((t / 6000)) % 60 // cap to 60 mins past 60 mins behaviour.

        return `${mins}:${sec}:${millisec}`
    }

    return (
        <>
            <h1 className='text-2xl'>{format(time)}</h1>
            <div className='flex items-center gap-10 '>
                <Button CTAText="Start" action={handleStart} type="PRIMARY" />
                <Button CTAText="Stop" action={handleStop} type="DANGER" />

                {!isRunning && time > 0 && <Button CTAText="Resume" action={handleResume} type="PRIMARY" />}
                <Button CTAText="Reset" action={handleReset} type="PRIMARY" icon={rotate} disable={time == 0} />
                <Button CTAText="Add to LAP" action={addToLap} type="PRIMARY" icon={add} disable={!isRunning} />
            </div>

            {laps.length > 0 && <Lap items={laps} />}
        </>
    )
}

export default Clock