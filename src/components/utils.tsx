
export function zip<T, U>(arr1: T[], arr2: U[]): [T, U][] {
    const length = Math.min(arr1.length, arr2.length);
    const result: [T, U][] = [];
    
    for (let i = 0; i < length; i++) {
      result.push([arr1[i], arr2[i]]);
    }
    
    return result;
  }