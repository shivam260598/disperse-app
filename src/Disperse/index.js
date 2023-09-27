import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import Header from './Header';
import TextAreaComponent from './TextAreaComponent';
import './styles.css';

function Disperse() {
    const [amounts, setAmounts] = useState('');
    const [errors, setErrors] = useState([]);
    const [isDuplicate, setIsDuplicate] = useState(false);

    useEffect(() => { setErrors([]); }, [amounts, setErrors]);

    return (
        <div className="main_container">
            <Header />

            <TextAreaComponent amounts={amounts} setAmounts={setAmounts} />

            <Footer 
                amounts={amounts}
                setAmounts={setAmounts}
                errors={errors}
                setErrors={setErrors}
                isDuplicate={isDuplicate}
                setIsDuplicate={setIsDuplicate}
            />
        </div>
    );
}

export default Disperse;