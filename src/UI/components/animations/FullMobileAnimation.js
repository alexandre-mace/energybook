import React from 'react';
import LottieControl from "./LottieControl";
import * as globeAnimationData from "./Globe.json";
import * as eyeAnimationData from "./Eye.json";
import * as lightningAnimationData from "./Lightning.json";
import * as graphPieAnimationData from "./Graph_Pie.json";

const FullMobileAnimation = () => (
    <div className={"mobile-animations"}>
        <div style={{position: "relative"}}>
            <div style={{position: "absolute", top: 30,  left: '50%', transform: 'translateX(calc(-50% -30px))'}}>
                <LottieControl animationData={globeAnimationData} width={45} height={45}/>
            </div>
            <div style={{position: "absolute", top: 2, left: '50%', transform: 'translateX(-50%)'}}>
                <LottieControl animationData={eyeAnimationData} width={150} height={150}/>
            </div>
            <div style={{position: "absolute", top: 70,  left: '50%', transform: 'translateX(calc(-50% - 50px))'}}>
                <LottieControl animationData={lightningAnimationData} width={35} height={35}/>
            </div>
            <div style={{position: "absolute", top: 80, left: '50%', transform: 'translateX(calc(-50% -30px))'}}>
                <LottieControl animationData={graphPieAnimationData} width={65} height={65}/>
            </div>
        </div>
    </div>
)
export default FullMobileAnimation;