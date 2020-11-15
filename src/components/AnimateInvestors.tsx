import { type } from "os";
import React, { useState, useLayoutEffect, useEffect, useRef } from "react";


const calculateBoundingBoxes = (children: any) => {
    const boundingBoxes:any = {};
  
    React.Children.forEach(children, child => {
      if(child.ref !==null && child.ref.current!==null ) {
        const domNode = child.ref.current;
      const nodeBoundingBox = domNode.getBoundingClientRect();
      boundingBoxes[child.key] = nodeBoundingBox;
      }
     
  
      
    });
  
    return boundingBoxes;
  };

const usePrevious = (value:any) => {
    const prevChildrenRef = useRef();
  
    useEffect(() => {
      prevChildrenRef.current = value;
    }, [value]);
  
    return prevChildrenRef.current;
  };

  interface Props {
    children: any
    setCoordinatesCallback: (x: any, y: any, key: any) => void,
   
}
const AnimateInvestors:React.FC<Props> = ({ children, setCoordinatesCallback }) => {
    console.log(children)
  const [boundingBox, setBoundingBox] = React.useState<any>({});
  const [prevBoundingBox, setPrevBoundingBox] = React.useState<any>({});
  const prevChildren = usePrevious(children);

  useLayoutEffect(() => {
    const newBoundingBox = calculateBoundingBoxes(children);
    setBoundingBox(newBoundingBox);
  }, [children]);

  useLayoutEffect(() => {
    const prevBoundingBox:any = calculateBoundingBoxes(prevChildren);
    setPrevBoundingBox(prevBoundingBox);
  }, [prevChildren]);

  function sleep(ms:any):any {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  

  useEffect(() => {
      
    const hasPrevBoundingBox = Object.keys(prevBoundingBox).length;

    if (hasPrevBoundingBox) {
      React.Children.forEach(children, child => {
        const domNode = child.ref.current;
        const oldBox:any = prevBoundingBox[child.key];
        const newBox = boundingBox[child.key];
        var changeInX:any = undefined
        var changeInY:any = undefined
        if(newBox!==undefined && oldBox!==undefined) {
        changeInX = oldBox.left - newBox.left ;
        changeInY = oldBox.top -newBox.top  ;
        }
        
       
        console.log(oldBox,child.key)
        if(changeInX!== 0) {
          console.log(changeInX,child.key)
        }
        if(changeInY!== 0) {
          console.log(changeInY,child.key)
        }
        
        if (changeInX !==0 || changeInY !==0  ) {
          setCoordinatesCallback(changeInX,changeInY,child.key)
        }
        

       /*  const requestFrame = async () => {
         
              requestAnimationFrame(() => {
              
                domNode.style.transform = `translate3D(0,20px,0 )`;
                domNode.style.transition = "transform 500ms";
              })
            } */

        /* if (changeInX !==0 || changeInY !==0) {
         
          requestAnimationFrame(() => {
          
            domNode.style.transform = `translate3D(${changeInX}px,${changeInY}px,0 )`;
           
            domNode.style.transition = "transform 0s";

            requestAnimationFrame(() => {
            
              domNode.style.transform = "";
              domNode.style.transition = "transform 500ms";
            });

          });
        } else {
         
      
    
               
     
         
        } */

      });
    } 

  }, [boundingBox, prevBoundingBox, children, setCoordinatesCallback]);

  return children;
};

export default AnimateInvestors;
