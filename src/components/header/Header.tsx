import React from 'react';
import styles from './styles.module.sass';
import {Role} from '../../types';

export default function HeaderImpl({
  setCount,
  setSortOrder,
  setSortByName,
  setSortByStatus,
  setSelectedRole,
  count,
  sortOrder,
  sortByName,
  sortByStatus,
  selectedRole,
}) {
  return (
    <div className={styles.header}>
      <div className={styles.selectors}>
        <div>
          <label>
            Количество сотрудников:
            <select value={count} onChange={e => setCount(e.target.value)}>
              <option value=''>Все</option>
              <option value='5'>5</option>
              <option value='10'>10</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Сортировать по дате рождения:
            <select value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
              <option value='none'>Не сортировать</option>
              <option value='asc'>По возрастанию</option>
              <option value='desc'>По убыванию</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Сортировать по имени:
            <select value={sortByName} onChange={e => setSortByName(e.target.value)}>
              <option value='none'>Не сортировать</option>
              <option value='first'>По первой букве</option>
              <option value='last'>По последней букве</option>
            </select>
          </label>
        </div>

        <div>
          <label>
            Сортировать по статусу:
            <select value={sortByStatus} onChange={e => setSortByStatus(e.target.value)}>
              <option value='none'>Не сортировать</option>
              <option value='isArchive'>В архиве</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Фильтровать по роли:
            <select value={selectedRole} onChange={e => setSelectedRole(e.target.value)}>
              <option value='none'>Все</option>
              <option value={Role.cook}>Повар</option>
              <option value={Role.driver}>Водитель</option>
              <option value={Role.waiter}>Официант</option>
            </select>
          </label>
        </div>
        <button> Добавить сотрудника</button>
      </div>
    </div>
  );
}
