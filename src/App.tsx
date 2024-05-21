import {useState, useMemo} from 'react';
import {useGetEmployeesQuery} from './redux';
import {EmployeCard} from './components/employeCard';
import styles from './app.module.sass';
import {Header} from './components/header';
import {Link} from 'react-router-dom';

function App() {
  const [count, setCount] = useState('');
  const [sortOrder, setSortOrder] = useState('none');
  const [sortByName, setSortByName] = useState('none');
  const [sortByStatus, setSortByStatus] = useState('none');
  const [selectedRole, setSelectedRole] = useState('none');

  const {data, isLoading, isError, error} = useGetEmployeesQuery(count);

  const filteredAndSortedData = useMemo(() => {
    if (!data) return [];

    let filteredEmployees =
      selectedRole === 'none'
        ? data
        : data.filter(employe => employe.role === selectedRole);

    if (sortOrder !== 'none') {
      filteredEmployees = [...filteredEmployees].sort((a, b) => {
        const dateA = new Date(a.birthday.split('.').reverse().join('-')).getTime();
        const dateB = new Date(b.birthday.split('.').reverse().join('-')).getTime();
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      });
    }

    if (sortByName !== 'none') {
      filteredEmployees = [...filteredEmployees].sort((a, b) => {
        const nameA = sortByName === 'first' ? a.name.charAt(0) : a.name.slice(-1);
        const nameB = sortByName === 'first' ? b.name.charAt(0) : b.name.slice(-1);
        return nameA.localeCompare(nameB, 'ru');
      });
    }

    if (sortByStatus === 'isArchive') {
      filteredEmployees = filteredEmployees.filter(employe => employe.isArchive);
    } else if (sortByStatus === 'notInArchive') {
      filteredEmployees = filteredEmployees.filter(employe => !employe.isArchive);
    }

    return filteredEmployees;
  }, [data, sortOrder, sortByName, sortByStatus, selectedRole]);

  if (isLoading) return <h1>Loading...</h1>;
  if (isError && 'data' in error && 'status' in error) {
    return (
      <div className={styles.error}>
        <h1>{error.data}</h1>
        <h2>{error.status}</h2>
      </div>
    );
  }

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
        {filteredAndSortedData.map(employe => (
          <Link to={`${employe.id}`} key={employe.id}>
            <EmployeCard employe={employe} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default App;
