import React, {useState} from 'react';
import {HiOutlineArrowCircleUp} from 'react-icons/hi';

const ScrollArrow = () =>{

    const [showScroll, setShowScroll] = useState(false)

    const checkScrollTop = () => {
        if (!showScroll && window.pageYOffset > 400){
            setShowScroll(true)
        } else if (showScroll && window.pageYOffset <= 400){
            setShowScroll(false)
        }
    };

    const scrollTop = () =>{
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    window.addEventListener('scroll', checkScrollTop)

    return (
        <HiOutlineArrowCircleUp className="scrollTop" onClick={scrollTop} style={{height: 50, color: '#eb5c5c', display: showScroll ? 'flex' : 'none'}}/>
    );
}

export default ScrollArrow;