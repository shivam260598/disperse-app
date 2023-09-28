import React, { useEffect, useRef, useState } from 'react';
import './styles.css';
import GLOBAL_CONSTANTS from '../../commons/global';

function TextAreaComponent({ amounts = '', setAmounts = () => {} }) {
    const lineElRef = useRef();
    const textRef = useRef();
    const textContainerRef = useRef();
    const [line, setLine] = useState(GLOBAL_CONSTANTS.one);
    const [activeLine, setActiveLine] = useState(GLOBAL_CONSTANTS.one);

    useEffect(() => { handleScroller(); }, []);

    const handleScroller = () => {
        let element = textRef?.current || null;

        if(element) {
            element.onscroll = (e) => {
                const bottomReached = (element.scrollTop + element.offsetHeight) >= (element.scrollHeight);
                if (bottomReached) lineElRef.current.scrollTop = element.scrollTop;
                lineElRef.current.scrollTop = element.scrollTop
            };
        };
    };

    const textChangeHandler = (e) => {
        const val = e.target.value;
        const newLine = (val.match(/\n/g) || []).length;
        if(newLine > 0) setLine(newLine + 1);
        if(newLine === 0) setLine(1);

        activeLineChangeHandler(e);
        setAmounts(val);
    }

    const activeLineChangeHandler = (e) => {
        const activeLineVal = e.target.value.substr(0, e.target.selectionStart)
            .split(GLOBAL_CONSTANTS.new_line_escape_sequence).length;
        if(activeLine  !== activeLineVal) setActiveLine(activeLineVal);
    }

    const renderNumberOfLines = () => {
        return [...Array(line).keys()].map(i => <span key={i} >{i+1}</span>);
    };

    return (
        <div className="text_area_container">
            <div className="text_container" ref={textContainerRef}>
                <div className="line_number" ref={lineElRef}>{renderNumberOfLines()}</div>
                <textarea 
                    onMouseUp={activeLineChangeHandler} 
                    ref={textRef}
                    onChange={textChangeHandler}
                    value={amounts}
                />
            </div>
        </div>
    );
}

export default TextAreaComponent;
