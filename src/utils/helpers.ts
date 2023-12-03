export const convertToBase64 = (file: Blob) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      return resolve(reader.result);
    };
  });
};

const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

export const generateID = (): string => {
  const length = 6;
  let res = '';

  for (let i = 0; i < length; i++) {
    res += chars[Math.floor(Math.random() * chars.length)];
  }

  return res;
};

export const getFilteredCountries = (countries: string[], value: string) => {
  return countries.filter(
    (country) =>
      value !== '' && country.toLowerCase().startsWith(value.toLowerCase())
  );
};

export function checkFileTooBig(file?: File): boolean {
  let valid = true;
  if (file) {
    const size = file.size / 1024 / 1024;
    if (size > 10) {
      valid = false;
    }
  }
  return valid;
}

export function checkFileCorrectType(file?: File): boolean {
  let valid = true;
  if (file) {
    if (!['application/pdf', 'image/jpeg', 'image/png'].includes(file.type)) {
      valid = false;
    }
  }
  return valid;
}

export const getPasswordStyles = (passwordValue: string) => {
  let backgroundColor = '';
  let width = '';

  if (passwordValue.length) {
    let isContainLowerLetters = false;
    let isContainApperLetters = false;
    let IsContainsDigits = false;
    let isContainSpecials = false;

    const lowerLetters = 'qwertyuiopasdfghjklzxcvbnm';
    const upperLetters = 'QWERTYUIOPLKJHGFDSAZXCVBNM';
    const digits = '0123456789';
    const specials = '!@#$%^&*()_-+=|/.,:;[]{}';

    for (let i = 0; i < passwordValue.length; i++) {
      if (
        !isContainLowerLetters &&
        lowerLetters.indexOf(passwordValue[i]) != -1
      ) {
        isContainLowerLetters = true;
      } else if (
        !isContainApperLetters &&
        upperLetters.indexOf(passwordValue[i]) != -1
      ) {
        isContainApperLetters = true;
      } else if (!IsContainsDigits && digits.indexOf(passwordValue[i]) != -1) {
        IsContainsDigits = true;
      } else if (!isContainSpecials && specials.indexOf(passwordValue[i]) != -1)
        isContainSpecials = true;
    }
    let rating = 0;
    if (isContainLowerLetters) {
      rating++;
    }
    if (isContainApperLetters) {
      rating++;
    }
    if (IsContainsDigits) {
      rating++;
    }
    if (isContainSpecials) {
      rating++;
    }

    if (rating < 2) {
      backgroundColor = '#d92323bd';
      width = '100px';
    }

    if (passwordValue.length >= 4 && rating >= 2 && rating < 3) {
      backgroundColor = '#ffff0078';
      width = '250px';
    }

    if (passwordValue.length >= 4 && rating == 3) {
      backgroundColor = '#0dff00a1';
      width = '400px';
    }

    if (passwordValue.length >= 6 && rating > 3) {
      backgroundColor = '#16c420';
      width = '500px';
    }
  }

  return {
    height: '2px',
    backgroundColor,
    width,
  };
};
