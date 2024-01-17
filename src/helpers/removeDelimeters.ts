const removeDelimiters = (text: string): string => {
  // Regular expression to match the VS Code snippet delimiters
  const regex = /\$\{\d+:([^}]*)\}/g;

  // Initialize a variable to track if replacements were made
  let replacementsMade;

  do {
    // Check if there are delimiters to replace
    replacementsMade = false;

    // Replace the matched delimiters with their default values
    text = text.replace(regex, (_, defaultValue: string) => {
      replacementsMade = true;
      return defaultValue;
    });
  } while (replacementsMade); // Continue until no more replacements are needed

  return text;
};

export default removeDelimiters;
