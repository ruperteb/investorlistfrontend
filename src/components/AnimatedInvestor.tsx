import React, { forwardRef } from "react";

type Props = {
    children:any
    
};

const animatedInvestorStyles = {
  marginLeft: "20px",
  /* marginRight: "auto", */
  

   width: "45%"
}

const AnimatedInvestor = React.forwardRef<HTMLDivElement,Props>(( props, ref) => (
  <div ref ={ref} {...props} style={animatedInvestorStyles}>
    {props.children}
  </div>
)


);




export default AnimatedInvestor;