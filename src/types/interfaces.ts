export interface FormData {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  conditionsAccepted?: boolean | undefined;
  file?: FileList | undefined;
  country: string;
}

export interface TileData {
  id: string;
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  conditionsAccepted: string;
  file: string;
  country: string;
}
