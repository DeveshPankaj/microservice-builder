import {FaCircle, FaCode, FaDotCircle} from "react-icons/fa";
import Draggable from "../Draggable";
import React, {useEffect, useRef} from "react";


import './ActionHeader.css'

interface Props {
    id: string
    title: string
    attributes: Array<{ type: string, text: string, id: string }>
    onDrag?: () => any
    onAttributeClick: (event:any, attribId: string) => any
    x?: number
    y?: number
    onClick: (e: any, attribute: { type: string, text: string, id: string }) => any
}

const ActionHandler: React.FC<Props> = (props) => {
    return (
        <Draggable id={props.id} zIndexOndrag={100} zIndex={10} className={'action-handler'} title={<><FaCode color={'orange'} style={{marginRight: '1rem'}} />{props.title}</>} onDrag={props.onDrag} x={props.x} y={props.y}>
            <ul>
                {
                    props.attributes.map(x =>
                        <li id={x.id} key={x.id} onClick={(e) => props.onClick(e, x)}>
                            {
                                x.type === 'input' ?
                                    <>
                                        <FaCircle className={'left'} type={'input-handle'} onClick={(e)=>props.onAttributeClick(e, x.id)}/>
                                        <div>{x.text}</div>
                                        <div></div>
                                        </>
                                    :
                                    <>
                                        <div></div>
                                        <div>{x.text}</div>
                                        <FaCircle className={'right'} type={'output-handle'} onClick={(e)=>props.onAttributeClick(e, x.id)}/>
                                 </>
                            }
                        </li>
                    )
                }
            </ul>
        </Draggable>
    )
};

export default ActionHandler