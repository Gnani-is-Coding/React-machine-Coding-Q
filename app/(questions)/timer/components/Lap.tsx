import React from 'react'
import { ILaps, LapItem } from './Clock'

type IProps = {
    items: LapItem[]
}

function Lap({ items }: IProps) {

    const delta = (index: number, curTime: number) => {
        if (index <= 0) return

        const [arr] = Object.entries(items[index - 1])

        return curTime - arr[1]
    }

    return (
        <div>
            <h1>LAP</h1>
            <ul>
                {items.map((obj, i) => {
                    const [arr] = Object.entries(obj)
                    const deltaVal = delta(i, arr[1])

                    return (
                        <li>
                            {arr[0]} : {arr[1]}
                            <h1>DeltaVal: {deltaVal ?? "-" }</h1>
                        </li>
                    )
                })
                }
            </ul>
        </div>
    )
}

export default Lap