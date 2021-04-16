import React from 'react';
import Sidebar from '../components/Sidebar';

import '../styles/pages/Grafic.css';

function Grafic(){
    return(
        <div className="grafic-page">
            <Sidebar page="grafic"/>
            <div className="grafic-area">
                <div className="pomodoro-grafic">
                    
                </div>
            </div>
        </div>
    )
}

export default Grafic;