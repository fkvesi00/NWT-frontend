import React from "react";
import 'tachyons'

const Navigation = ({onRouteChange, isSingedIn}) => {
        {
        if(isSingedIn){
            return(
        <nav style={{display:'flex',justifyContent:'flex-end'}}>
            <p className="f3 link dim black underline pa3 pointer" onClick={()=>onRouteChange('signin')} >Sign Out</p>
        </nav>
        )
    } else {
        return(
        <nav style={{display:'flex',justifyContent:'flex-end'}}>
            <p className="f3 link dim black underline pa3 pointer" onClick={()=>onRouteChange('signin')} >Sign in</p>
            <p className="f3 link dim black underline pa3 pointer" onClick={()=>onRouteChange('register')} >Register</p>
        </nav>
         )
     }
    }
}

export default Navigation;