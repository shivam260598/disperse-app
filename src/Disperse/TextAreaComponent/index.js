import React from 'react';
import './styles.css';
import GLOBAL_CONSTANTS from '../../commons/global';

function DisplayNumbers({ amounts = '' }) {
    const amountArr = amounts.split(GLOBAL_CONSTANTS.new_line_escape_sequence);

    return (
        amountArr || []).map((_, index) => (
            <div>{index + 1}</div>
        )
    );
}

function TextAreaComponent({ amounts = '', setAmounts = () => {} }) {
//     const prefix = '1 ';

//     const textareaRef = useRef(null);

//   useEffect(() => {
//     if (textareaRef.current) {
//       textareaRef.current.value = prefix + (amounts || '').substring(prefix.length);
//     }
//   }, [amounts]);

//   const handleInputChange = (e) => {
//     const input = e.target.value || '';
//     setAmounts(input);
//   };

    return (
           <div className="text_area_container">
                <div className="line_numbers">
                    <DisplayNumbers amounts={amounts} />
                </div>
                <textarea
                    className="input_box"
                    value={amounts}
                    onChange={(e) => setAmounts(e.target.value)}
                    // ref={textareaRef}
                    // onChange={handleInputChange}
                />
            </div>
    );
}

export default TextAreaComponent;
