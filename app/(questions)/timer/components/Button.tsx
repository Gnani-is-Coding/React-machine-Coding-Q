import React from 'react'

type IProps = {
    CTAText: string,
    action: () => void,
    type: string,
    icon?: any,
    disable?: boolean
}

function Button({ CTAText, action, type, icon, disable }: IProps) {
    let bgColor

    switch (type) {
        case "PRIMARY":
            bgColor = 'bg-blue-600'
            break
        case "DANGER":
            bgColor = 'bg-red-600'
            break
        default:
            bgColor = 'bg-blue-600'
    }
    return (
        <button className={`flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors ${bgColor} ${disable && 'disabled:cursor-not-allowed'}`}
            onClick={action} disabled={disable}>

            {icon}
            {CTAText}
        </button >
    )
}

export default Button