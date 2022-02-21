export const checkFlag = flag => {
  let returnFlag = false;
  for (let value of Object.values(flag)) {
    if (value === true) returnFlag = true;
  }
  return returnFlag;
};

export const checkBlank = (formData, flag, handleFlag) => {
  let returnFlag = false;

  for (let [key, value] of Object.entries(formData)) {
    if ((value === '' || value === '직접입력') && key in flag) {
      handleFlag(key, true);
      returnFlag = true;
    } else if (value !== '' && key in flag) handleFlag(key, false);
  }

  return returnFlag;
};
