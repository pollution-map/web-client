/* eslint-disable no-restricted-syntax */
import { useEffect, useState } from 'react';

const useValidation = (value, validations) => {
  const [isEmpty, setEmpty] = useState(true);
  const [isPEmpty, setPEmpty] = useState(true);
  const [minLength, setMinLength] = useState(false);
  const [maxLength, setMaxLength] = useState(false);
  const [inputValid, setInputValid] = useState(false);
  const [isEmail, setEmail] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line guard-for-in
    for (const validation in validations) {
      // eslint-disable-next-line default-case
      switch (validation) {
        case 'minLength':
          // eslint-disable-next-line no-unused-expressions
          value ? setPEmpty(false) : setPEmpty(true);
          // eslint-disable-next-line no-unused-expressions
          value.length < validations[validation] && isPEmpty === false
            ? setMinLength(true)
            : setMinLength(false);
          break;
        case 'maxLength':
          // eslint-disable-next-line no-unused-expressions
          value ? setPEmpty(false) : setPEmpty(true);
          // eslint-disable-next-line no-unused-expressions
          value.length > validations[validation] && isPEmpty === false
            ? setMaxLength(true)
            : setMaxLength(false);
          break;
        case 'isEmpty':
          // eslint-disable-next-line no-unused-expressions
          value ? setPEmpty(false) : setPEmpty(true);
          // eslint-disable-next-line no-unused-expressions
          value ? setEmpty(false) : setEmpty(true);
          break;
        case 'isEmail':
          // eslint-disable-next-line no-unused-expressions
          value ? setPEmpty(false) : setPEmpty(true);
          // eslint-disable-next-line no-case-declarations
          const re =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
          // eslint-disable-next-line no-unused-expressions
          !re.test(String(value).toLocaleLowerCase()) && isPEmpty === false
            ? setEmail(true)
            : setEmail(false);
          break;
      }
    }
  }, [value]);
  const errorMessage = {
    isEmpty: 'Поле пустое',
    minLength: 'Поле должно быть длиннее 6 символов',
    maxLength: 'Поле должно быть короче',
    isEmail: 'Введенный Email некорректен',
  };

  useEffect(() => {
    if (isPEmpty || minLength || maxLength || isEmail) {
      setInputValid(false);
    } else {
      setInputValid(true);
    }
  }, [isPEmpty, minLength, maxLength, isEmail]);
  return {
    isEmpty,
    minLength,
    maxLength,
    isEmail,
    errorMessage,
    inputValid,
  };
};

export default useValidation;
