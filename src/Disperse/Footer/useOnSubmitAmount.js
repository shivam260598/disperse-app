import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GLOBAL_CONSTANTS from '../../commons/global';

const runChecks = ({ amount, index, setErrors }) => {
    const addressAmountArr = amount.split((/[ ,=]/));

    let errorString = '';

    const address = addressAmountArr[GLOBAL_CONSTANTS.zero] || '';
    const addressAmount = Number(addressAmountArr[GLOBAL_CONSTANTS.one]);

    let flag = true;
    if (address.length !== GLOBAL_CONSTANTS.address_length 
        || !address.startsWith(GLOBAL_CONSTANTS.address_starting_text)) {
        
        errorString = `Line ${index + 1} invalid Ethereum address`;
        flag = false;
    }
    
    if (isNaN(addressAmount)) {
        errorString = errorString 
            ? `${errorString} and wrong amount` : `Line ${index + 1} wrong amount`;
       flag = false;
    }

    if (errorString) setErrors((prev) => [...prev, errorString]);

    return flag;
};

const getDuplicates = (amountArr) => {
    const duplicates = {};
  
    (amountArr || []).forEach((amount, index) => {
        const address = amount.split(/[ ,=]/)[GLOBAL_CONSTANTS.zero];

        if (duplicates[address]) {
            duplicates[address].push(index);
        } else {
            duplicates[address] = [index];
        }
    });
  
    for (const address in duplicates) {
        if (duplicates[address].length === 1) {
            delete duplicates[address];
        }
    }
  
    return duplicates;
};

const useOnSubmitAmount = ({ amounts, setErrors, setIsDuplicate }) => {
    const onSubmit = () => {
        setErrors([]);
        setIsDuplicate(false);

        const amountArr = amounts.split(GLOBAL_CONSTANTS.new_line_escape_sequence);
        const isAcceptedArr = (amountArr || []).map(
            (amount, index) => runChecks({ amount, index, setErrors }));

        const isValid = (isAcceptedArr || []).every((value) => value);

        if (!isValid) return;

        const duplicates = getDuplicates(amountArr);

        if (Object.keys(duplicates || {}).length > GLOBAL_CONSTANTS.zero) {
            setErrors(() => {
                return Object.entries(duplicates).map(([duplicate, indexes]) => {
                    const lineNums = indexes.map(element => element + 1).join(', ');
                    return `${duplicate} duplicate in Line : ${lineNums}`;
                });
            });

            setIsDuplicate(true);
            return;
        };

        toast.success('Data uploaded successfully !', {
            position: toast.POSITION.BOTTOM_CENTER
        });
    };

    return { onSubmit };
};

export default useOnSubmitAmount;