export const toBoolean = (value: string | number | boolean): boolean => {
  const truthyValues: (string | number | boolean)[] = [true, 'true', 'True', 'TRUE', '1', 1];

  /*if (value === undefined) {
    return false;
  }*/

  return truthyValues.includes(value);
};
