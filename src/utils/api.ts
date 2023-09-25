import queryString from "query-string";

const stringifyParams = (data: any) => {
  const { params, option } = data;
  return queryString.stringify(params, {
    arrayFormat: "comma",
    encode: false,
    skipNull: true,
    skipEmptyString: true,
    ...option,
  });
};

export { stringifyParams };
