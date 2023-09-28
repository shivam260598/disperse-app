import React, { useEffect, useRef, useState } from 'react';
import './styles.css';
import GLOBAL_CONSTANTS from '../../commons/global';

function TextAreaComponent({ amounts = '', setAmounts = () => {} }) {
    const lineElRef = useRef();
    const textRef = useRef();
    const [line, setLine] = useState(GLOBAL_CONSTANTS.one);

    const handleScroller = () => {
        let element = textRef?.current || null;

        if(element) {
            element.onscroll = (e) => {
                lineElRef.current.scrollTop = element.scrollTop;
            };
        };
    };

    useEffect(() => { handleScroller(); }, []);

    const textChangeHandler = (e) => {
        const val = e.target.value;
        const newLine = (val.match(/\n/g) || []).length;
        if(newLine > 0) setLine(newLine + 1);
        if(newLine === 0) setLine(1);

        setAmounts(val);
    }

    const renderNumberOfLines = () => {
        return [...Array(line).keys()].map(i => <span key={i}>{i + 1}</span>);
    };

    return (
        <div className="text_area_container">
            <div className="text_container">
                <div className="line_number" ref={lineElRef}>{renderNumberOfLines()}</div>
                <textarea 
                    ref={textRef}
                    onChange={textChangeHandler}
                    value={amounts}
                />
            </div>
        </div>
    );
}

export default TextAreaComponent;
