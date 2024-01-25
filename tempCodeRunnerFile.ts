const arrayOfObjectsVariable = [
  {
    key1: 1,
    key2: "Value 1",
  },
  {
    key1: 2,
    key2: "Value 2",
  },
];

console.log(
  arrayOfObjectsVariable
    .map(({ key2 }) => {
      return key2;
    })
    .join(", ")
);
