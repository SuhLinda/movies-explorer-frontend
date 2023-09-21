import { useCallback, useState } from 'react';

const useFormValidation = () => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  function handleChangeForm(evt) {
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

    setIsValid(evt.target.closest("form").checkValidity());
  }

  const resetFormValues = useCallback((
    newValues = {}, newErrors = {}, newIsValid = false,
  ) => {
    setValues(newValues);
    setErrors(newErrors);
    setIsValid(newIsValid);
  }, [setValues, setErrors, setIsValid]);

  return {
    values,
    errors,
    isValid,
    handleChangeForm,
    resetFormValues,
  };
};

export default useFormValidation;
