export const StringModifier = (initialValue: string) => {
  let result: string = initialValue;

  const builder = {
    get: () => result,
    capitalize: () => {
      result = result.toUpperCase();
      return builder;
    },
    append: (str: string) => {
      result += str;
      return builder;
    },
    removeDelimiters: () => {
      // Regular expression to match the outermost layer of delimiters
      const regex = /\$\{\d+:(.*?)\}/;

      // Continuously replace the outermost layer until no more delimiters are found
      while (regex.test(result)) {
        result = result.replace(regex, '$1');
      }

      return builder;
    },
  };
  return builder;
};
