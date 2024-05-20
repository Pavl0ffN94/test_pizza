// EmployeEditor.js
import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import {Employe} from '../types';
// import styles from './employeEditor.module.css'; // Замените на ваш файл стилей

interface EmployeEditorProps {
  employeData: Employe; // Передаем данные о сотруднике в компонент
}

const EmployeEditor: React.FC<EmployeEditorProps> = ({employeData}) => {
  const {id} = useParams<{id: string}>();
  const [employe, setEmploye] = useState<Employe>(employeData);

  // Функция для сохранения изменений сотрудника
  const saveChanges = () => {
    // Реализуйте сохранение изменений, например, отправкой данных на сервер
    console.log('Сохранение изменений:', employe);
  };

  // Обработчик изменения полей
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setEmploye(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className={styles.editor}>
      <h2>Редактирование карточки сотрудника ID: {id}</h2>
      <form>
        <div>
          <label>
            Имя:
            <input
              type='text'
              name='name'
              value={employe.name}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <label>
            Роль:
            <input
              type='text'
              name='role'
              value={employe.role}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <label>
            Телефон:
            <input
              type='text'
              name='phone'
              value={employe.phone}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <label>
            День рождения:
            <input
              type='text'
              name='birthday'
              value={employe.birthday}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <button type='button' onClick={saveChanges}>
          Сохранить изменения
        </button>
      </form>
    </div>
  );
};

export default EmployeEditor;
