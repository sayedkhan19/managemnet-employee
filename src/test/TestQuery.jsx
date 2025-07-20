import { useQuery } from '@tanstack/react-query';

const TestQuery = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      return res.json();
    }
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {data.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  );
};

export default TestQuery;
