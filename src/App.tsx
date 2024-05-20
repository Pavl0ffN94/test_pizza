import {useState, useMemo} from 'react';
import {useGetEmployeesQuery} from './redux';
import {Employe} from './types';
import {EmployeCard} from './components/employeCard';
import styles from './app.module.sass';
import {Header} from './components/header';

function App() {
  const [count, setCount] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('none');
  const [sortByName, setSortByName] = useState<string>('none');
  const [sortByStatus, setSortByStatus] = useState<string>('none');
  const [selectedRole, setSelectedRole] = useState<string>('none');
  const {data, isLoading, isError, error} = useGetEmployeesQuery(count);

  const filteredAndSortedData = useMemo(() => {
    if (!data) return [];

    let filteredEmployees =
      selectedRole === 'none'
        ? data
        : data.filter((employe: Employe) => employe.role === selectedRole);

    if (sortOrder !== 'none') {
      filteredEmployees = [...filteredEmployees].sort((a: Employe, b: Employe) => {
        const dateA = new Date(a.birthday.split('.').reverse().join('-')).getTime();
        const dateB = new Date(b.birthday.split('.').reverse().join('-')).getTime();
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      });
    }

    if (sortByName !== 'none') {
      filteredEmployees = [...filteredEmployees].sort((a: Employe, b: Employe) => {
        const nameA = sortByName === 'first' ? a.name.charAt(0) : a.name.slice(-1);
        const nameB = sortByName === 'first' ? b.name.charAt(0) : b.name.slice(-1);
        return nameA.localeCompare(nameB, 'ru');
      });
    }

    if (sortByStatus === 'isArchive') {
      filteredEmployees = filteredEmployees.filter(
        (employe: Employe) => employe.isArchive,
      );
    } else if (sortByStatus === 'notInArchive') {
      filteredEmployees = filteredEmployees.filter(
        (employe: Employe) => !employe.isArchive,
      );
    }

    return filteredEmployees;
  }, [data, sortOrder, sortByName, sortByStatus, selectedRole]);

  if (isLoading) return <h1>Loading...</h1>;

  if (isError) return <h1>{error.error}</h1>;

  return (
    <div className={styles.container}>
      <Header
        count={count}
        selectedRole={selectedRole}
        sortByName={sortByName}
        sortByStatus={sortByStatus}
        sortOrder={sortOrder}
        setCount={setCount}
        setSelectedRole={setSelectedRole}
        setSortByName={setSortByName}
        setSortByStatus={setSortByStatus}
        setSortOrder={setSortOrder}
      />
      <div className={styles['employee-list']}>
        {filteredAndSortedData.map((employe: Employe) => (
          <EmployeCard key={employe.id} employe={employe} />
        ))}
      </div>
    </div>
  );
}

export default App;
