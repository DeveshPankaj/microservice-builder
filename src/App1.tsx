import React, {useContext, useState} from 'react';
import './App1.css';

function App() {

    const [activeTab, setActiveTab] = useState<string>('home')
    const p1 = {
        x: 150,
        y: 200
    }
    const p2 = {
        x: 450,
        y: -20
    }

    const lines = [
        {
            a: [10, 10],
            b: [10, 100]
        },
        {
            a: [20, 10],
            b: [20, 100]
        }
    ]

    return (
        <div>
            <header>
                {/*<div></div>*/}
                <nav>
                    <ul>
                        <li className={activeTab === 'home' ? 'active' : ''} onClick={()=>setActiveTab('home')}>
                            <span>Home</span>
                        </li>
                        <li className={activeTab === 'docs' ? 'active' : ''} onClick={()=>setActiveTab('docs')}>
                            <span>Docs</span>
                        </li>
                        <li className={activeTab === 'about' ? 'active' : ''} onClick={()=>setActiveTab('about')}>
                            <span>About</span>
                        </li>
                        <li className={activeTab === 'contact' ? 'active' : ''} onClick={()=>setActiveTab('contact')}>
                            <span>Contact</span>
                        </li>
                    </ul>
                </nav>
                <div>
                    {/*Last*/}
                </div>
            </header>

            <picture>
                <svg width={window.innerWidth} height={window.innerHeight-50}>
                    <g stroke={'gray'} strokeWidth={1} fill={'transparent'}>
                        {
                            lines.map(l => <path d={`M${l.a[0]}, ${l.a[1]} L${l.b[0]}, ${l.b[1]}`} />)
                        }
                    </g>
                </svg>
            </picture>

            {/*<section>*/}
            {/*    <picture>*/}
            {/*        <svg width={window.innerWidth} height={window.innerHeight-50}>*/}
            {/*            <path d={`M10, 10 C${p1.x}, ${p1.y} ${p2.x}, ${p2.y} 610, 20`} strokeWidth={3} fill={'green'} stroke={'orange'} />*/}
            {/*            <circle cx={p1.x} cy={p1.y} r="2" stroke="none" strokeWidth={3} fill="red" />*/}
            {/*            <circle cx={p2.x} cy={p2.y} r="2" stroke="none" strokeWidth={3} fill="red" />*/}
            {/*        </svg>*/}

            {/*    </picture>*/}
            {/*</section>*/}
        </div>
    )
}

export default App;
