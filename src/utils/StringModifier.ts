export const StringModifier = (initialValue: string) => {
  let result: string = initialValue;

  const builder = {
    get: () => result,
    removeDelimiters: () => {
      // Regular expression to match the outermost layer of delimiters
      const regex = /\$\{\d+:(.*?)\}/;

      // Continuously replace the outermost layer until no more delimiters are found
      while (regex.test(result)) {
        result = result.replace(regex, '$1');
      }

      return builder;
    },
    quoteLines: () => {
      // Split the result into lines, then quote each line and join them back
      result = result
        .split('\n')
        .map((line) => `"${line}",`)
        .join('\n');
      return builder;
    },
    escapeQuotes: () => {
      // Replace all double quotes with escaped double quotes
      result = result.replace(/"/g, '\\"');
      return builder;
    },
  };
  return builder;
};
