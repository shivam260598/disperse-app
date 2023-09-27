import GLOBAL_CONSTANTS from "../../../commons/global";

const useDisplayError = ({ setAmounts, setIsDuplicate }) => {
    const onClickKeepFirst = () => {
        setAmounts((prev) => {
            const amountArr = prev.split(GLOBAL_CONSTANTS.new_line_escape_sequence);
            const seenAddresses = new Set();
            const uniqueAmountArr = [];
          
            for (const element of amountArr) {
                const currentAddress = element.split(/[ ,=]/)[GLOBAL_CONSTANTS.zero];
                if (!seenAddresses.has(currentAddress)) {
                    seenAddresses.add(currentAddress);
                    uniqueAmountArr.push(element);
                }
            }
          
            return uniqueAmountArr.join(GLOBAL_CONSTANTS.new_line_escape_sequence);
        });

        setIsDuplicate(false);
    };

    const onClickCombineBalance = () => {
        setAmounts((prev) => {
            const amountArr = prev.split(GLOBAL_CONSTANTS.new_line_escape_sequence);
          
            const finalAmountsObj = {};
            amountArr.forEach((element) => {
                const [currentAddress, currentAmount] = element.split(/[ ,=]/);
                const delimiter = element.charAt(GLOBAL_CONSTANTS.address_length);
                const parsedAmount = Number(currentAmount);
          
                if (finalAmountsObj[currentAddress]) {
                    finalAmountsObj[currentAddress].value += parsedAmount;
                } else {
                    finalAmountsObj[currentAddress] = { value: parsedAmount, delimiter };
                }
            });
          
            const finalAmounts = Object.keys(finalAmountsObj)
                .map((address) => `${address}${finalAmountsObj[address].delimiter}${finalAmountsObj[address].value}`)
                .join(GLOBAL_CONSTANTS.new_line_escape_sequence);
          
            return finalAmounts;
          });

        setIsDuplicate(false);
    };

    return { onClickKeepFirst, onClickCombineBalance }
};

export default useDisplayError;



