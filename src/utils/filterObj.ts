const filterObj: Function = (obj: any, ...allowedFields: string[]) => {
  const filteredObject: any = {};

  Object.keys(obj).forEach((key) => {
    if (allowedFields.includes(key)) {
      filteredObject[key] = obj[key];
    }
  });

  return filteredObject;
};

export default filterObj;
