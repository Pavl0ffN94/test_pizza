import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {Employees} from '../types';

export const employeesApi = createApi({
  reducerPath: 'employeesApi',
  baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3001/'}),
  endpoints: build => ({
    getEmployees: build.query<Employees[], string | void>({
      query: limit => `employees?${limit && `_limit=${limit}`}`,
    }),
  }),
});

export const {useGetEmployeesQuery} = employeesApi;
