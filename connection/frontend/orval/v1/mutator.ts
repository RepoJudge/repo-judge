import { baseFetch } from '../baseMutator';

const customFetch: typeof baseFetch = (url, options) => {
  return baseFetch('/api/v1' + url, options);
};

export default customFetch;
