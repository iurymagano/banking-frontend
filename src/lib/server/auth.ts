'use server';

import { SignInData } from '@/types/Auth';
import { registerAccount, signIn, signUp } from '../requests';
import { cookies } from 'next/headers';
import { User } from '@/types/User';
import { redirect } from 'next/navigation';
import { AccountCreate } from '@/types/Accounts';

export const handleSignIn = async (data: SignInData) => {
  const response = await signIn(data);

  if (response.result === 'success') {
    cookies().set({
      name: process.env.NEXT_PUBLIC_AUTH_KEY as string,
      //@ts-ignore
      value: response.data?.token,
      httpOnly: true,
      maxAge: 86400 * 7, // 7 days
    });
  }

  return response;
};

export const handleSignUp = async (data: AccountCreate) => {
  const response = await signUp(data);
  console.log('🚀 ~ handleSignUp ~ response:', response);

  if (response.result === 'success') {
    cookies().set({
      name: process.env.NEXT_PUBLIC_AUTH_KEY as string,
      //@ts-ignore
      value: response.data?.token,
      httpOnly: true,
      maxAge: 86400 * 7, // 7 days
    });
  }

  return response;
};

export const handleGetUser = async () => {
  const token = cookies().get(
    process.env.NEXT_PUBLIC_AUTH_KEY as string,
  )?.value;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API}/auth/me`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const jsonResponse = await response.json();

    const userData = jsonResponse.data;

    if (userData) return userData as User;

    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const handleSignOut = () => {
  cookies().delete(process.env.NEXT_PUBLIC_AUTH_KEY as string);
  redirect('/');
};
