import { useCallback, useState } from 'react';

const useFormValidation = () => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  function handleChangeForm (evt) {
    const name = evt.target.name;
    const value = evt.target.value;

    setValues({
      ...values,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: evt.target.validationMessage,
    });
  }

  const resetFormValues = useCallback((
    newValues = {}, newErrors = {},
  ) => {
    setValues(newValues);
    setErrors(newErrors);
  }, [setValues, setErrors]);

  return {
    values,
    errors,
    handleChangeForm,
    resetFormValues,
  };
};

export default useFormValidation;
