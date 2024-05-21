import React, {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {Employe} from '../types';
import styles from './styles.module.sass';
import {
  useGetOneEmployeQuery,
  useUpdateEmployeMutation,
  useCreateEmployeMutation,
} from '../../redux';
import InputMask from 'react-input-mask';
import {Role} from '../../types';
import {v4 as uuidv4} from 'uuid';

const EmployeEditorImpl: React.FC = () => {
  const {id} = useParams<{id: string}>();
  const isEditing = Boolean(id);
  const {data: employeData} = useGetOneEmployeQuery(id, {
    skip: !isEditing,
  });
  const [employe, setEmploye] = useState<Employe>(
    employeData || {
      id: uuidv4(),
      name: '',
      role: '',
      phone: '',
      birthday: '',
      isArchive: false,
    },
  );
  const [updateEmploye] = useUpdateEmployeMutation();
  const [createEmploye] = useCreateEmployeMutation();
  const navigate = useNavigate();

  const saveChanges = async () => {
    try {
      if (isEditing) {
        await updateEmploye({id, ...employe}).unwrap();
      } else {
        await createEmploye(employe).unwrap();
      }
      navigate('/');
    } catch (error) {
      console.error('Ошибка при сохранении изменений:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setEmploye(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const {name, value} = e.target;
    setEmploye(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, checked} = e.target;
    setEmploye(prevState => ({
      ...prevState,
      [name]: checked,
    }));
  };

  useEffect(() => {
    if (employeData) {
      setEmploye(employeData);
    }
  }, [employeData]);

  return (
    <div className={styles.editor}>
      <h2>
        {isEditing
          ? `Редактирование карточки сотрудника ID: ${id}`
          : 'Создание нового сотрудника'}
      </h2>
      <form>
        <div>
          <label>
            Имя:
            <input
              type='text'
              name='name'
              value={employe.name || ''}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <label>
            Роль:
            <select name='role' value={employe.role || ''} onChange={handleSelectChange}>
              <option value=''>Выберите роль</option>
              {Object.values(Role).map(role => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label>
            Телефон:
            <InputMask
              mask='+7 (999) 999-9999'
              value={employe.phone || ''}
              onChange={handleInputChange}>
              {inputProps => <input {...inputProps} type='text' name='phone' />}
            </InputMask>
          </label>
        </div>
        <div>
          <label>
            День рождения:
            <input
              type='text'
              name='birthday'
              value={employe.birthday || ''}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <label className={styles.checkbox}>
            В архиве:
            <input
              type='checkbox'
              name='isArchive'
              checked={employe.isArchive || false}
              onChange={handleCheckboxChange}
            />
          </label>
        </div>
        <button type='button' onClick={saveChanges}>
          {isEditing ? 'Сохранить изменения' : 'Создать сотрудника'}
        </button>
      </form>
    </div>
  );
};

export default EmployeEditorImpl;
