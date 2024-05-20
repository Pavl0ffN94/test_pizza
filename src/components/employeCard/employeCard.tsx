import React from 'react';
import styles from './style.module.sass';
import {Employe} from '../../types';

interface EmployeCardProps {
  employe: Employe;
}

const EmployeCardImpl: React.FC<EmployeCardProps> = ({employe}) => {
  const {name, role, phone, isArchive} = employe;

  return (
    <div className={styles['employee-card']}>
      <h2 className={styles['employee-card__header']}>{name}</h2>
      <div className={styles['employee-card__details']}>
        <div className={styles['employee-card__item']}>
          <span className={styles['employee-card__label']}>Role:</span> {role}
        </div>
        <div className={styles['employee-card__item']}>
          <span className={styles['employee-card__label']}>Phone:</span> {phone}
        </div>
        <div className={styles['employee-card__isArhive']}>
          <h3> В архиве</h3>
          <input type='checkbox' defaultChecked={isArchive} disabled />
        </div>
      </div>
    </div>
  );
};

export default EmployeCardImpl;
