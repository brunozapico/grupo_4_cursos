import React from 'react';
import './logo.css'

function Logo(){
    let logo = "/lgo-wa-derecha.png"
    let logoChico = "/logo-wa.png"
    return(
        <div>
            <img id='lgo-wa-amplio' src={logo}/> 
            <img id='lgo-wa' src={logoChico}/>
        </div>
    )
} 

export default Logo;