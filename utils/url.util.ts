export const createQueryString = (initialSearchParams: URLSearchParams, keys: string[], values: string[]) => {
  if (keys.length !== values.length) {
    throw Error('You did not provide all required data for search params')
  }

  const searchParams = new URLSearchParams(initialSearchParams);

  for (let i = 0; i < keys.length; ++i) {
    let key = keys[i];
    let value = values[i];
    
    searchParams.set(key, value);
  }


  return searchParams.toString();
}