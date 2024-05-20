import {configureStore} from '@reduxjs/toolkit';
import {employeesApi} from './employeesApi';

export const store = configureStore({
  reducer: {
    [employeesApi.reducerPath]: employeesApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(employeesApi.middleware),
});
