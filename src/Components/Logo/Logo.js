import React from "react";
import Tilt from 'react-parallax-tilt';
import './Logo.css'

const Logo = () => {
    return(
        <div className="ma4 mt0 ">
            <Tilt className="Tilt br2 shadow-2  " options={{max:25}} style={{height:120, width:250}}>
                <div className="Tilt-inner" style={{paddingTop:'5px'}}>
                <img style={{paddingTop: '20px'}} alt='logo' src='https://www.fesb.unist.hr/wp-content/uploads/2018/12/FESBUNIST.jpg'/>
                </div>
            </Tilt>
        </div>
    ) 
}

export default Logo;