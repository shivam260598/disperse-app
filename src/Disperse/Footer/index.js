import React from 'react';
import './styles.css';
import useOnSubmitAmount from './useOnSubmitAmount';
import { ToastContainer } from 'react-toastify';
import DisplayError from './DisplayError';

function Footer({ amounts, setAmounts, errors, setErrors, isDuplicate, setIsDuplicate }) {
    const { onSubmit } = useOnSubmitAmount({ amounts, setErrors, setIsDuplicate });

    return (
        <div className="footer_main_container">
            <div className="footer_text_container">
                <div className="separated_by_text">Separated by ',' or ' ', or '='</div>
                <div className="show_example">Show Example</div>
            </div>

            {(errors || []).length > 0 ? 
                <DisplayError 
                    errors={errors} 
                    setErrors={setErrors}
                    isDuplicate={isDuplicate}
                    setIsDuplicate={setIsDuplicate}
                    setAmounts={setAmounts}
                /> 
            : null}

            <button className="next_button" onClick={onSubmit}>Next</button>
            <ToastContainer />
        </div>
    );
}

export default Footer;