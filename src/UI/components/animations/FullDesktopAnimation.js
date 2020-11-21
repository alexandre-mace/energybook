import React from 'react';
import LottieControl from "./LottieControl";
import * as globeAnimationData from "./Globe.json";
import * as eyeAnimationData from "./Eye.json";
import * as lightningAnimationData from "./Lightning.json";
import * as graphPieAnimationData from "./Graph_Pie.json";

const FullDesktopAnimation = () => (
    <div className={"desktop-animations"}>
        <div className="m-5" style={{position: "relative", height: 1, transform: 'translate(50%, -50px)'}}>
            <div style={{position: "absolute", top: 10, left: 130}}>
                <LottieControl animationData={globeAnimationData} width={70} height={70}/>
            </div>
            <div style={{position: "absolute", top: 2, left: 50}}>
                <LottieControl animationData={eyeAnimationData} width={200} height={200}/>
            </div>
            <div style={{position: "absolute", top: 70, left: 60}}>
                <LottieControl animationData={lightningAnimationData} width={50} height={50}/>
            </div>
            <div style={{position: "absolute", top: 100, left: 150}}>
                <LottieControl animationData={graphPieAnimationData} width={100} height={100}/>
            </div>
        </div>
    </div>
)
export default FullDesktopAnimation;