/* eslint-disable no-restricted-syntax */
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import useValidation from './useValidation';

const useInput = (initialState, validations) => {
  const [value, setValue] = useState(initialState);
  const [isDirty, setDirty] = useState(false);
  const valid = useValidation(value, validations);
  const { enqueueSnackbar } = useSnackbar();

  const onChange = (e) => {
    setValue(e.target.value);
  };
  const massageSample = (massage, variant = 'error') => {
    enqueueSnackbar(massage, { variant });
  };
  const errorMessage = () => {
    // eslint-disable-next-line guard-for-in
    for (const validation in validations) {
      // eslint-disable-next-line default-case
      switch (validation) {
        case 'minLength':
          if (!valid.minLength) break;
          massageSample(valid.errorMessage.minLength);
          break;
        case 'maxLength':
          if (!valid.maxLength) break;
          massageSample(valid.errorMessage.maxLength);
          break;
        case 'isEmpty':
          if (!valid.isEmpty) break;
          massageSample(valid.errorMessage.isEmpty);
          break;
        case 'isEmail':
          if (!valid.isEmail) break;
          massageSample(valid.errorMessage.isEmail);
          break;
      }
    }
  };
  const onBlur = () => {
    setDirty(true);
    errorMessage();
  };

  return {
    value,
    setValue,
    onChange,
    onBlur,
    isDirty,
    ...valid,
  };
};

export default useInput;
