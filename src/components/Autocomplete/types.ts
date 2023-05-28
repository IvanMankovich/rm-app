export interface AutocompleteBaseProps {
  label: string;
  placeholder: string;
  searchQuery: (value: string) => Promise<IOption[]>;
}

export interface IOption {
  id: string;
  name: string;
  image?: string;
}