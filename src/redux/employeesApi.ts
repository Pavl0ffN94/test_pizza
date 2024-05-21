import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {Employees} from '../types';

export const employeesApi = createApi({
  reducerPath: 'employeesApi',
  baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3001/'}),
  tagTypes: ['Employe'],
  endpoints: build => ({
    getEmployees: build.query<Employees[], string | void>({
      query: limit => `employees?${limit && `_limit=${limit}`}`,
      providesTags: result =>
        result
          ? [
              ...result.map(({id}) => ({type: 'Employe', id} as const)),
              {type: 'Employe', id: 'LIST'},
            ]
          : [{type: 'Employe', id: 'LIST'}],
    }),
    getOneEmploye: build.query({
      query: id => `employees/${id}`,
      providesTags: (result, error, id) => [{type: 'Employe', id}],
    }),
    updateEmploye: build.mutation({
      query: ({id, ...patch}) => ({
        url: `employees/${id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: (result, error, {id}) => [{type: 'Employe', id}],
    }),
    createEmploye: build.mutation({
      query: newEmploye => ({
        url: `employees`,
        method: 'POST',
        body: newEmploye,
      }),
      invalidatesTags: [{type: 'Employe', id: 'LIST'}],
    }),
  }),
});

export const {
  useGetEmployeesQuery,
  useGetOneEmployeQuery,
  useUpdateEmployeMutation,
  useCreateEmployeMutation,
} = employeesApi;
