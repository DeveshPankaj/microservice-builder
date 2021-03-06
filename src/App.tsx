import React, {useContext, useState} from 'react';
import './App.css';
import ActionHandler from "./components/draggable-items/ActionHandler";
import Board from "./components/board/Board";
import {BoardContext} from "./contexts/board.context";
import {FaShare, FaReply} from "react-icons/fa";

type Subject = {
    id: string
    type: 'switch' | 'form' | 'closed' | 'action' | 'program'
    text: string
    attributes: Array<{ type: 'input' | 'output', text: string, id: string }>
} & { pos?: { x: number, y: number }, icon?: string }

function App() {

    const [lines, setLines] = useState<Array<[number, number, number, number]>>([[0, 100, 180, 100]])
    const programList: Array<Subject> = [
        {
            id: 'Signup.form',
            type: 'form',
            text: 'Signup Form',
            attributes: [
                {
                    id: 'Signup.form.arg',
                    text: 'Args',
                    type: 'input'
                },
                {
                    id: 'Signup.form.return',
                    text: 'return',
                    type: 'output'
                }
            ],
            pos: {
                x: 100,
                y: 100
            }
        },
        // {
        //     id: 'login.switch',
        //     type: 'switch',
        //     text: 'Login Switch',
        //     attributes: [
        //         {
        //             id: 'login.switch.arg',
        //             text: 'Args',
        //             type: 'input'
        //         },
        //         {
        //             id: 'login.switch.401',
        //             text: '401',
        //             type: 'output'
        //         },
        //         {
        //             id: 'login.switch.500',
        //             text: 'Error',
        //             type: 'output'
        //         },
        //     ]
        // },
        {
            id: 'Signup',
            type: 'program',
            text: 'Signup',
            attributes: [
                {
                    id: 'signup.arg',
                    text: 'Args',
                    type: 'input'
                },
                {
                    id: 'signup.return',
                    text: 'Return',
                    type: 'output'
                }
            ],
            pos: {
                x: 300,
                y: 200
            }
        },
        {
            id: 'Switch',
            type: 'switch',
            text: 'Switch',
            attributes: [
                {
                    id: 'Switch.arg',
                    text: 'Args',
                    type: 'input'
                },
                {
                    id: 'Switch.forward',
                    text: 'Forward',
                    type: 'output'
                },
                {
                    id: 'Switch.error',
                    text: 'Error',
                    type: 'output'
                }
            ],
            pos: {
                x: 500,
                y: 300
            }
        },
        {
            id: 'GetToken',
            type: 'program',
            text: 'GetToken',
            attributes: [
                {
                    id: 'GetToken.arg',
                    text: 'Args',
                    type: 'input'
                },
                {
                    id: 'GetToken.return',
                    text: 'Token',
                    type: 'output'
                }
            ],
            pos: {
                x: 800,
                y: 200
            }
        },
        {
            id: 'Transform',
            type: 'program',
            text: 'Transform',
            attributes: [
                {
                    id: 'Transform.arg',
                    text: 'Args',
                    type: 'input'
                },
                {
                    id: 'Transform.return',
                    text: 'Token',
                    type: 'output'
                }
            ],
            pos: {
                x: 800,
                y: 400
            }
        },
        {
            id: 'Response',
            type: 'program',
            text: 'Response',
            attributes: [
                {
                    id: 'Response.arg',
                    text: 'Args',
                    type: 'input'
                }
            ],
            pos: {
                x: 1100,
                y: 300
            }
        },

    ]


    const handleOnDrag = (id: string) => {
        const elements = document.getElementById(id)?.querySelectorAll(`[type$=-handle]`)
        const board = document.getElementById('board')?.getBoundingClientRect() || {x: 0, y: 0}

        elements?.forEach(e => {
            let rect = e.getBoundingClientRect()
            dispatch({
                type: "update",
                payload: {
                    id: e.parentElement?.id || 'undefined',
                    x: rect.x - board.x + rect.width / 2,
                    y: rect.y - board.y + rect.height / 2
                }
            })
        })
    }

    const onAttributeClick = (event: any, id: string) => {
        let rect = event.target.getBoundingClientRect()
        setLines([[rect.x, rect.y, lines[0][2], lines[0][3]]])
    }

    const {state, dispatch} = useContext(BoardContext);

    const editorConfig = {
        height: `${window.innerHeight}px`,
        width: `${window.innerWidth}px`,
    }

    const [overlay, setOverlay] = useState<boolean>(false)
    const [editor, setEditor] = useState<boolean>(false)
    const [selectedItem, setSelectedItem] = useState<Subject | null>(null)

    const handleAttributeClick = (event: any, attribute: any, item: Subject) => {
        setSelectedItem(item)
        setOverlay(true)
    }

    const gridRef = React.useRef<HTMLDivElement>(null)
    const zoom = React.useRef(1)
    const tap = React.useRef({
        x: 0,
        y: 0
    })
    const offset = React.useRef({
        x: 0,
        y: 0
    })

    React.useEffect(() => {
        if(!gridRef.current) return;

        const onMouseMove = (ev: MouseEvent) => {
            let diff = {
                x: ev.pageX - tap.current.x,
                y: ev.pageY - tap.current.y,
            }
            tap.current = {x: ev.pageX, y: ev.pageY}
            offset.current = {x: offset.current.x + diff.x, y: offset.current.y + diff.y}

            if(gridRef.current) gridRef.current.style.transform = `translate(${offset.current.x / zoom.current}px, ${offset.current.y / zoom.current}px)`
        }

        const onMouseUp = (ev: MouseEvent) => {
            gridRef.current?.removeEventListener('mouseup', onMouseUp)
            gridRef.current?.removeEventListener('mousemove', onMouseMove)
        }

        const preventDefault = (ev: Event) => {
            ev.preventDefault()
        }

        const onMouseDown = (ev: MouseEvent) => {
            tap.current = {
                x: ev.pageX,
                y: ev.pageY
            }
            gridRef.current?.addEventListener('mousemove', onMouseMove)
            gridRef.current?.addEventListener('selectstart', preventDefault)
            gridRef.current?.addEventListener('mouseup', onMouseUp)
        }

        const onScroll = (ev: WheelEvent) => {
            if(ev.deltaY > 0) {
                zoom.current = zoom.current * 0.9
            }
            if(ev.deltaY < 0) {
                zoom.current = zoom.current * 1.1
            }

            if(gridRef.current) gridRef.current.style.zoom = `${zoom.current}`
        }
        
        gridRef.current.addEventListener('mousedown', onMouseDown)
        gridRef.current.addEventListener('wheel', onScroll)

        return () => {
            gridRef.current?.removeEventListener('mousedown', onMouseDown)
            gridRef.current?.removeEventListener('mousemove', onMouseMove)
            gridRef.current?.removeEventListener('mouseup', onMouseUp)
            gridRef.current?.removeEventListener('selectstart', preventDefault)
            gridRef.current?.removeEventListener('wheel', onScroll)
        }
    }, [gridRef])

    return (
        <>
            <div style={{position: 'relative'}} ref={gridRef}>

                {/*<button onClick={handleUpdate}>Update</button>*/}
                <div style={{position: 'absolute', top: 0, ...editorConfig}} id={'board'}>
                    <Board style={{width: 'inherit', height: 'inherit'}}/>
                </div>

                <div
                    style={{position: 'absolute', top: 0, ...editorConfig}}>
                    {
                        programList.map(p => <ActionHandler
                            x={p.pos?.x}
                            y={p.pos?.y}
                            onClick={(e, attribute) => handleAttributeClick(e, attribute, p)}
                            onAttributeClick={onAttributeClick} key={p.id}
                            title={p.text} attributes={p.attributes}
                            onDrag={() => handleOnDrag(p.id)} id={p.id}/>)
                    }


                </div>
            </div>
            <div id="overlayOne" style={{display: overlay ? 'block' : 'none'}}>

                <h4>/{selectedItem?.type}/{selectedItem?.text}</h4>
                {/*<ul style={{listStyle: 'none', margin: 0, padding: 0}}>*/}
                {/*    {*/}
                {/*        selectedItem?.attributes.map(x => <li>{x.type === 'input' ? <FaShare/> :*/}
                {/*            <FaReply/>} {x.text}</li>)*/}
                {/*    }*/}
                {/*</ul>*/}

                <ul style={{listStyle: 'none', margin: 0, padding: 0}}>
                    {
                        selectedItem?.attributes.filter(x => x.type === 'input').map(x => <input key={x.id} type="text" placeholder={x.text} />)
                    }
                </ul>

                <button>Run test</button>

                <div style={{position: 'fixed', bottom: 0, right: 0, margin: '.5rem'}}>
                    <button onClick={() => setEditor(!editor)}>
                        Edit
                    </button>

                    <button onClick={() => setOverlay(!overlay)}>
                        Close
                    </button>
                </div>
            </div>

            <div id="overlayTwo" style={{display: editor ? 'block' : 'none'}}>
                <pre>{`exports.handler =  async function(event, context) {
    console.log("EVENT: " + JSON.stringify(event, null, 2))
    return context.logStreamName
}`}</pre>
            </div>

        </>
    );
}

export default App;
