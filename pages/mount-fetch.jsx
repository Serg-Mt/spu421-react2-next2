import { useEffect, useState } from 'react'
import UserCard from '../components/User-Card';

export default function Page() {
  const
    [number, setNumber] = useState(1);
  return <>
    <input type='number' value={number} onInput={event => setNumber(event.target.value)} />
    <LoadUserCard userId={number} />
  </>

}

function LoadUserCard({ userId }) {
  const
    [error, setError] = useState(null),
    [user, setUser] = useState(null);
  useEffect(() => {
    async function main() {
      try {
        setError(null);
        setUser(null);
        const
          response = await fetch('https://jsonplaceholder.typicode.com/users/' + userId + '?' + Math.random());
        if (!response.ok) throw new Error('Err:' + response.status);
        setUser(await response.json());
      } catch (err) {
        setError(err);
      }
    }
    main();
  }, [userId]);

  if (error)
    return <div className='error'>{error.toString()}</div>;
  if (user)
    return <UserCard user={user} />;
  return <Spinner />
}

function Spinner() {
  return <div>...loading</div>
}