'use client';

import { LoginSchemaType, loginSchema } from '@FsdFeatures/login/model/schema';
import { CommonInput } from '@FsdShared/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

type Props = {
  isInterceptionPage?: boolean;
};

export default function LoginForm({ isInterceptionPage }: Props) {
  const router = useRouter();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    setValue,
    setError,
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'guest@test.com',
      password: 'qw1234!@',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async ({ email, password }) => {
    if (email && password) {
      const result = await signIn('credentials', {
        username: email,
        password,
        // callbackUrl: '/',
        redirect: false,
      });

      if (result && result.ok) {
        if (isInterceptionPage) {
          router.back();
        } else {
          router.push('/');
        }
      } else {
        setError('submit', {
          type: 'oneOf',
          message: result && typeof result.error === 'string' ? result.error : 'An unknown error occurred.',
        });
        setValue('password', '');
      }
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div>EMAIL</div>
        <CommonInput {...register('email')} type="email" />
        {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
      </div>
      <div className="pt-3">
        <div>PW</div>
        <CommonInput {...register('password')} type="password" />
        {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
      </div>
      <div className="pt-3 flex justify-center">
        <button
          type="submit"
          className="w-full py-2.5 px-5 text-sm text-white font-medium bg-primary hover:bg-primary-dark focus:outline-none focus:ring-4 focus:ring-gray-100 rounded-lg inline-flex items-center"
          onClick={() => {}}
        >
          <p className="w-full flex justify-center">Login</p>
        </button>
      </div>
      {errors.submit && <div className="pt-3 text-red-500 text-xm text-center">{errors.submit.message}</div>}
    </form>
  );
}
