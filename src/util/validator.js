/**
 * Validation form
 * @param {Array} data
 */
export default function validation(data) {
  const formClone = Object.assign([], data);

  formClone.forEach(element => {
    if (element.isRequired && element.valid === '') {
      element.isValid = false;
    }
    if (element.pattern) {
      const regex = RegExp(element.pattern);
      const res = regex.test(element.value);
      element.isValid = res;
    }
  });

  const isValidFilter = formClone.filter(item => item.isValid === true);
  const isValidFormFilter = isValidFilter.length === formClone.length;

  return {
    form: formClone,
    isValidForm: isValidFormFilter,
  };
}
