"use client"

import { BsCheck2All, BsCircle } from "react-icons/bs"

interface CheckedProps {
    checked: boolean
    handleCheck: () => void
}

export default function Checked(props: CheckedProps) {
    return (
        props.checked ? (
            <BsCheck2All
                size={19}
                color={"green"}
                onClick={() => props.handleCheck()}
                style={{cursor:"pointer"}}
            />
        ) : (
            <BsCircle
                size={19}
                color={'#9aa8bc'}
                onClick={() => props.handleCheck()}
                style={{cursor:"pointer"}}
            />
        )
    )
}