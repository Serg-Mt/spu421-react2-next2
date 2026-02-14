import { useState } from 'react'
import UserCard from '../components/User-Card';



export default function Page() {
  const
    [disabled, setDisabled] = useState(false),
    [error, setError] = useState(null),
    [users, setUsers] = useState(null);
  return <>
    <button
      disabled={disabled}
      onClick={async () => {
        setDisabled(true);
        try {
          const
            response = await fetch('https://jsonplaceholder.typicode.com/users/');
          if (!response.ok) throw new Error('Err:' + response.status);
          setUsers(await response.json());

        } catch (err) {
          setError(err);
        }
      }
      }
    >
      load
    </button>
    {error && <div className='error'>{error.toString()}</div>}
    {users && users?.length && users.map(user => <UserCard user={user} key={user.id} />)}
  </>
} 