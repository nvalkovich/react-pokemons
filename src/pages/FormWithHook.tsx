import { useForm } from 'react-hook-form';
import { setFormData } from '../store/formSlice';
import { useAppDispatch } from '../store/hooks';
import { useNavigate } from 'react-router-dom';
import { FormData } from '../types/interfaces';
import {
  convertToBase64,
  generateID,
  getPasswordStyles,
} from '../utils/helpers';
import { yupResolver } from '@hookform/resolvers/yup';
import { CountryAutocomplete } from '../components/CountryAutocomplete';
import { formSchema } from '../utils/yup/formSchema';

export const FormWithHook = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onChange',
    resolver: yupResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    const file = data.file?.[0];

    if (file) {
      const image = (await convertToBase64(file)) as string;
      dispatch(setFormData({ ...data, file: image, id: generateID() }));

      setTimeout(() => {
        navigate('/');
      }, 100);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <div className="form__item">
        <label htmlFor="name">Name</label>
        <input id="name" {...register('name')} />
        {errors.name && <p className="error-message">{errors.name.message}</p>}
      </div>

      <div className="form__item">
        <label htmlFor="age">Age</label>
        <input id="age" type="number" {...register('age')} />
        {errors.age && <p className="error-message">{errors.age.message}</p>}
      </div>

      <div className="form__item">
        <label htmlFor="email">Email</label>
        <input id="email" {...register('email')} />
        {errors.email && (
          <p className="error-message">{errors.email.message}</p>
        )}
      </div>

      <div className="form__item">
        <div className="password-input">
          <label htmlFor="password">Password</label>
          <input id="password" {...register('password')} />
          <div
            className="password-strength"
            style={getPasswordStyles(getValues('password') || '')}
          ></div>
        </div>
        {errors.password && (
          <p className="error-message">{errors.password.message}</p>
        )}
      </div>

      <div className="form__item">
        <label htmlFor="confirmPassword">Confirm password</label>
        <input id="confirmPassword" {...register('confirmPassword')} />
        {errors.confirmPassword && (
          <p className="error-message">{errors.confirmPassword.message}</p>
        )}
      </div>

      <div className="form__item">
        <CountryAutocomplete {...register('country')} />
        {errors.country && (
          <p className="error-message">{errors.country.message}</p>
        )}
      </div>

      <div className="form__item">
        <div className="gender-radio-container">
          <p>Gender:</p>
          <div className="gender-radio">
            <input
              type="radio"
              id="male"
              value="male"
              {...register('gender')}
            />
            <label htmlFor="male">male</label>

            <input
              type="radio"
              id="female"
              value="female"
              {...register('gender')}
            />
            <label htmlFor="female">female</label>
          </div>
        </div>
        {errors.gender && (
          <p className="error-message">{errors.gender.message}</p>
        )}
      </div>

      <div className="form__item">
        <div className="file-input-container">
          <label htmlFor="file">Choose File</label>
          <input id="file" type="file" {...register('file')} />
          {errors.file && (
            <p className="error-message">{errors.file.message}</p>
          )}
        </div>
      </div>

      <div className="form__item">
        <div className="conditions-checkbox-container">
          <label htmlFor="conditionsAccepted">
            I agree to the terms and conditions
          </label>
          <input
            id="conditionsAccepted"
            type="checkbox"
            {...register('conditionsAccepted')}
          />
        </div>
        {errors.conditionsAccepted && (
          <p className="error-message">{errors.conditionsAccepted.message}</p>
        )}
      </div>

      {Object.entries(errors).length ? (
        <button type="submit" disabled>
          Submit
        </button>
      ) : (
        <button type="submit">Submit</button>
      )}
    </form>
  );
};
