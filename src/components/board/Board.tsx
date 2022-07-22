import React, {useEffect, useReducer, useContext} from "react";
import {BoardContext} from '../../contexts/board.context'
import {prependListener} from "cluster";

interface Props {
    style: {
        width: string,
        height: string
    }
}

export type Item = {
    id: string
    x: number
    y: number
}


const Board: React.FC<Props> = (props) => {
    // const [state, dispatch] = useReducer(reducer, initialState);
    const {state, dispatch} = useContext(BoardContext);

    const _line = (points: [number, number, number, number], key: string) => {
        let midPoint = (points[0] + points[2]) / 2
        return <path
            key={key}
            d={`M${points[0]},${points[1]} C${midPoint},${points[1]} ${midPoint},${points[3]} ${points[2]},${points[3]}`}
            fill={'transparent'} stroke={'green'} strokeWidth={3}/>
    }

    return (
        <svg style={{...props.style}} xmlns="http://www.w3.org/2000/svg">
            {/*{*/}
            {/*    Object.entries(state).map(([key,value]) => <circle key={key} cx={value.x} cy={value.y} r="5" stroke="transparent" strokeWidth="0" fill="red" />)*/}
            {/*}*/}
            {
                Object.entries(state).filter(([x, y]) => y.connectedTo).map(([key, value]) => {
                    if (!state[value.connectedTo || '']) return null
                    let line: [number, number, number, number] = [value.x, value.y, state[value.connectedTo || '']?.x, state[value.connectedTo || '']?.y]

                    return _line(line, key)
                    //     return <path key={'line' + key}
                    //                  d={`M ${line[0]} ${line[1]} Q ${(line[0] + line[2]) * 0.25} ${(line[1] + line[3]) * 0.5}, ${(line[0] + line[2]) * 0.5} ${(line[1] + line[3]) * 0.5} T ${line[2]} ${line[3]}`}
                    //                  strokeWidth={3}
                    //                  stroke="orange" fill="transparent"/>
                })
            }
            {/*<path d="M100,250 C244,254 241,144 367,143" fill={'transparent'} stroke={'green'} strokeWidth={3} />*/}
            {/*<circle cx="50" cy="50" r="5" stroke="transparent" strokeWidth="0" fill="red" />*/}
            {/*<path d="M 0 80 Q 45 100, 90 80 T 180 80" stroke="orange" fill="transparent"/>*/}
            {/*<path d="M 0 80 Q 45 100, 90 80 T 180 80" stroke="orange" fill="transparent"/>*/}
        </svg>
    )
}

export default Board
