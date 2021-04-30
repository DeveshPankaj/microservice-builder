import React, {useState, useRef, useEffect} from 'react';

import './Draggable.css'

interface Props {
    id?: string
    className?: string
    zIndex?: number
    zIndexOndrag?: number
    title: string | React.ReactNode
    onDrag?: () => void
    x?: number
    y?: number
}


function useDragging({x, y}: {x: number, y: number}) {
    const [isDragging, setIsDragging] = useState(false);
    const [pos, setPos] = useState<{x: number, y: number}>({ x: x, y: y });
    const ref = useRef<HTMLDivElement>(null);
    const boxRef = useRef<HTMLDivElement>(null);

    function onMouseMove(e: any) {
      if (!isDragging) return;
      if(boxRef.current) {
        let p = boxRef.current.getBoundingClientRect();
        let parent = boxRef.current.parentElement?.getBoundingClientRect() || {x: 0, y: 0};
        // console.log(p, e.movementX, e.movementY);
        let d = {
            x: p.x - parent.x,
            y: p.y - parent.y,
            mX: e.movementX,
            mY: e.movementY,
        }
        setPos({
            x: d.x + e.movementX,
            y: d.y + e.movementY,
        });
      }
      
      e.stopPropagation();
      e.preventDefault();
    }
  
    function onMouseUp(e: any) {
      setIsDragging(false);
      e.stopPropagation();
      e.preventDefault();
    }
  
    function onMouseDown(e: any) {
      if (e.button !== 0) return;
      setIsDragging(true);

    //   if(ref.current){
    //     setPos({
    //         x: e.x - ref.current.offsetWidth / 2,
    //         y: e.y - ref.current.offsetHeight / 2,
    //       });
    //   }
      
      e.stopPropagation();
      e.preventDefault();
    }
  
    // When the element mounts, attach an mousedown listener
    useEffect(() => {
      ref.current?.addEventListener("mousedown", onMouseDown);
  
      return () => {
        ref?.current?.removeEventListener("mousedown", onMouseDown);
      };
    }, [ref]);
  
    // Everytime the isDragging state changes, assign or remove
    // the corresponding mousemove and mouseup handlers
    useEffect(() => {
      if (isDragging) {
        document.addEventListener("mouseup", onMouseUp);
        document.addEventListener("mousemove", onMouseMove);
      } else {
        document.removeEventListener("mouseup", onMouseUp);
        document.removeEventListener("mousemove", onMouseMove);
      }
      return () => {
        document.removeEventListener("mouseup", onMouseUp);
        document.removeEventListener("mousemove", onMouseMove);
      };
    }, [isDragging]);
  
    return {boxRef, ref, pos, isDragging};
  }








const Draggable: React.FC<Props> = props => {
    
    const {boxRef, ref, pos, isDragging} = useDragging({x: props.x||0, y: props.y||0})

    useEffect(()=> {
        if(props.onDrag)props.onDrag()
    }, [pos])

    return (
        <article
            className={`draggable ${props.className} ${isDragging?'dragging': ''}`} 
            id={props.id}
            ref={boxRef}
            style={{
                left: pos.x,
                top: pos.y,
                zIndex: isDragging? props.zIndexOndrag: props.zIndex,
                width: 'fit-content'
            }}
            >
            <header ref={ref} className={`draggable-header ${isDragging?'dragging': ''}`}>
                {props.title}
            </header>
            <section className={`draggable-content ${isDragging?'dragging': ''}`}>
                {props.children}
            </section>
        </article>
    );
};


export default Draggable;