import React from 'react';
import './styles.css';
import useDisplayError from './useDisplayError';

function DisplayError({ errors, setErrors, isDuplicate, setIsDuplicate, setAmounts }) {
    const { onClickKeepFirst, onClickCombineBalance } = useDisplayError({ setAmounts, setIsDuplicate });

    return (
        <div className="error_container">
            {isDuplicate ? <div className="duplicate_container">
                <div>Duplicated</div>
                <div className="action_container">
                    <div 
                        className="action_text" 
                        onClick={onClickKeepFirst}
                    >
                            Keep the first one
                    </div>
                    <div className="separator_line" />
                    <div 
                        className="action_text"
                        onClick={onClickCombineBalance}
                    >
                        Combine Balance
                    </div>
                </div>
            </div> : null}
            
            <div className="display_container">
                <img
                    src="https://icon-library.com/images/alert-icon/alert-icon-11.jpg"
                    alt=""
                    className="alert_image"
                />

                <div className="errors_text">
                    {(errors || []).map((error) => (
                        <div className="error">
                            {error}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default DisplayError;