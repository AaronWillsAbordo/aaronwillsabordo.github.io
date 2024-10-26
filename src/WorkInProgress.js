import React from 'react';
import {dataImgs} from './dataImgs';
import './WorkInProgress.css';

export default function WorkInProgress() {
    const imgWorkInProgress = dataImgs.find(img => img.name === "workInProgress");
    const imgGear = dataImgs.find(img => img.name === "gear");

    return (
        <div className="work-in-progress-container">
            <img src={imgGear.source} alt='Gear' className="gear-image" />
            <img src={imgWorkInProgress.source} alt='Work in progress' className="work-in-progress-image" />
        </div>
    );
}
