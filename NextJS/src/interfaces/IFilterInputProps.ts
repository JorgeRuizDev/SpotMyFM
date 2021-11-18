export interface IFilterInputProps<T> {
  array: Array<T>;
  setFilteredArray: (items: Array<T>) => void;
  filterFunction: (genericItem: T, value: string) => boolean;
  placeholder?: string;
}
