export interface Employe {
  id: number;
  name: string;
  isArchive: boolean;
  role: string;
  phone: string;
  birthday: string;
}
export type Employees = Employe[];

export enum Role {
  cook = 'cook',
  driver = 'driver',
  waiter = 'waiter',
}
