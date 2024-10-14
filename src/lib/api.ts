'use server';

import { cookies } from 'next/headers';
import axios, { AxiosError } from 'axios';
import { ApiError } from '@/types/Api';

type Props = {
  endpoint: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data?: object;
  withAuth?: boolean;
  withAttachment?: boolean;
};

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_API;

export const api = async <TypeResponse>({
  endpoint,
  method = 'GET',
  data,
  withAuth = true,
  withAttachment = false,
}: Props) => {
  const instance = axios.create({ baseURL: BASE_URL });

  if (withAuth) {
    const sessionAuth = cookies().get(
      process.env.NEXT_PUBLIC_AUTH_KEY as string,
    );
    if (sessionAuth?.value) {
      instance.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${sessionAuth?.value}`;
    }
  }

  if (withAttachment) {
    instance.defaults.headers.common['Content-Type'] = 'multipart/form-data';
  }

  try {
    const request = await instance<TypeResponse>(endpoint, {
      method,
      params: method == 'GET' && data,
      data: method != 'GET' && data,
    });

    return request.data;
  } catch (error) {
    const e = error as AxiosError<ApiError>;
    return {
      result: 'error',
      message: e.response?.data?.message ?? 'Ocorreu um erro inesperado',
      data: {},
    };
  }
};
