const keyToName = (key: string): string =>
  key
    .split('-')
    .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join(' ');

const toSearchable = (str: string): string => str.toLowerCase().replace(/\s+/g, '-');

export { keyToName, toSearchable };
