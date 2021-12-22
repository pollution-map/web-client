/* eslint-disable no-restricted-syntax */
import { useEffect, useState } from 'react';

const useValidation = (value, validations) => {
  const [isEmpty, setEmpty] = useState(true);
  const [minLength, setMinLength] = useState(false);
  const [maxLength, setMaxLength] = useState(false);
  const [inputValid, setInputValid] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line guard-for-in
    for (const validation in validations) {
      // eslint-disable-next-line default-case
      switch (validation) {
        case 'minLength':
          // eslint-disable-next-line no-unused-expressions
          value.length < validations[validation]
            ? setMinLength(true)
            : setMinLength(false);
          break;
        case 'maxLength':
          // eslint-disable-next-line no-unused-expressions
          value.length > validations[validation]
            ? setMaxLength(true)
            : setMaxLength(false);
          break;
        case 'isEmpty':
          // eslint-disable-next-line no-unused-expressions
          value ? setEmpty(false) : setEmpty(true);
          break;
      }
    }
  }, [value]);
  const errorMessage = {
    isEmpty: 'Cтрока пуста',
    minLength: 'Cтрока слишком короткая',
    maxLength: 'Cтрока слишко длинная',
  };

  useEffect(() => {
    if (isEmpty || minLength || maxLength) {
      setInputValid(false);
    } else {
      setInputValid(true);
    }
  }, [isEmpty, minLength, maxLength]);
  return {
    isEmpty,
    maxLength,
    minLength,
    errorMessage,
    inputValid,
  };
};

export default useValidation;
