import { FormEvent, useRef, useState } from 'react';
import { useAppDispatch } from '../store/hooks';
import { setFormData } from '../store/formSlice';
import { useNavigate } from 'react-router-dom';
import {
  convertToBase64,
  generateID,
  getPasswordStyles,
} from '../utils/helpers';
import { CountryAutocomplete } from '../components/CountryAutocomplete';
import { ValidationError } from 'yup';
import { formSchema } from '../utils/yup/formSchema';

const errorsDefaultState = {
  name: '',
  age: '',
  email: '',
  password: '',
  confirmPassword: '',
  gender: '',
  conditionsAccepted: '',
  file: '',
  country: '',
};

export const Uncontrolled = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const maleGenderRef = useRef<HTMLInputElement>(null);
  const femaleGenderRef = useRef<HTMLInputElement>(null);
  const conditionsAcceptedRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);

  const [errors, setErrors] = useState(errorsDefaultState);

  const [password, setPassword] = useState('');

  const onPasswordChange = () => {
    setPassword(passwordRef.current?.value || '');
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const data = {
      name: nameRef.current?.value,
      age: ageRef.current?.value,
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
      confirmPassword: confirmPasswordRef.current?.value,
      gender:
        (maleGenderRef.current?.checked && maleGenderRef.current.value) ||
        (femaleGenderRef.current?.checked && femaleGenderRef.current.value),
      conditionsAccepted: conditionsAcceptedRef.current?.checked,
      file: fileRef.current?.files,
      country: countryRef.current?.value,
    };

    const isFormValid = await formSchema
      .validate(data, {
        abortEarly: false,
      })
      .catch((err) => {
        const errors = err.inner.reduce(
          (acc: object, error: ValidationError) => {
            const path = error.path as string;
            return {
              ...acc,
              [path]: error.message,
            };
          },
          {}
        );

        setErrors(errors);
      });

    if (isFormValid) {
      const file = data.file && data.file[0];

      if (!file) {
        return;
      }

      const image = (await convertToBase64(file)) as string;

      dispatch(setFormData({ ...data, file: image, id: generateID() }));

      setTimeout(() => {
        navigate('/');
      }, 1000);

      setErrors(errorsDefaultState);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form" noValidate>
      <div className="form__item">
        <label htmlFor="name">Name</label>
        <input id="name" ref={nameRef} name="name" />
        {errors.name && <p className="error-message">{errors.name}</p>}
      </div>

      <div className="form__item">
        <label htmlFor="age">Age</label>
        <input id="age" type="number" ref={ageRef} name="age" />
        {errors.age && <p className="error-message">{errors.age}</p>}
      </div>

      <div className="form__item">
        <label htmlFor="email">Email</label>
        <input id="email" ref={emailRef} name="email" />
        {errors.email && <p className="error-message">{errors.email}</p>}
      </div>

      <div className="form__item">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          ref={passwordRef}
          name="password"
          onChange={onPasswordChange}
        />
        <div
          className="password-strength"
          style={getPasswordStyles(password || '')}
        ></div>
        {errors.password && <p className="error-message">{errors.password}</p>}
      </div>

      <div className="form__item">
        <label htmlFor="confirmPassword">Confirm password</label>
        <input
          id="confirmPassword"
          ref={confirmPasswordRef}
          name="confirmPassword"
        />
        {errors.confirmPassword && (
          <p className="error-message">{errors.confirmPassword}</p>
        )}
      </div>

      <div className="form__item">
        <CountryAutocomplete ref={countryRef} name="country" />
        {errors.country && <p className="error-message">{errors.country}</p>}
      </div>

      <div className="form__item">
        <div className="gender-radio-container">
          <p>Gender:</p>
          <div className="gender-radio">
            <input
              type="radio"
              id="male"
              value="male"
              ref={maleGenderRef}
              name="gender"
            />
            <label htmlFor="male">male</label>
            <input
              type="radio"
              id="female"
              value="female"
              name="gender"
              ref={femaleGenderRef}
            />
            <label htmlFor="female">female</label>
          </div>
        </div>
        {errors.gender && <p className="error-message">{errors.gender}</p>}
      </div>

      <div className="form__item">
        <div className="file-input-container">
          <label htmlFor="file">Choose File</label>
          <input id="file" type="file" ref={fileRef} />
        </div>
        {errors.file && <p className="error-message">{errors.file}</p>}
      </div>

      <div className="form__item">
        <div className="conditions-checkbox-container">
          <label htmlFor="conditionsAccepted">
            I agree to the terms and conditions
          </label>
          <input
            ref={conditionsAcceptedRef}
            type="checkbox"
            name="conditionsAccepted"
            id="conditionsAccepted"
          />
        </div>
        {errors.conditionsAccepted && (
          <p className="error-message">{errors.conditionsAccepted}</p>
        )}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};
