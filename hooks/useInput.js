import { useCallback, useState } from 'react';

const useInput = (initValue = '') => {
    const [value, setter] = useState(initValue);
    const handler = useCallback(e => {
        setter(e.target.value);
    }, []);

    return [value, handler];
};

export default useInput;
