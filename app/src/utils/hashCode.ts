export type HashCode = number;

export const hashCode = (str: string): HashCode => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    let character = str.charCodeAt(i);
    hash = (hash << 5) - hash + character;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
};

// https://stackoverflow.com/a/8076436