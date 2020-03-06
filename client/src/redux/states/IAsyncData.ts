export default interface IAsyncData<T> {
  data?: T;
  isLoading: boolean;
  err: string;
};