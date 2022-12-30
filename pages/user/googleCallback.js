import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useContext, useState } from 'react';

import { UserContext } from '../../context/user';

export default function GoogleCallback() {
  const [error, setError] = useState();
  const router = useRouter();
  const { doGoogleCallback, user, setUser } = useContext(UserContext);
  
  useEffect(()=> {
    async function fetchData(){
      if (router.query.access_token) {
        const res = await doGoogleCallback({
          access_token: router.query.access_token,
        });
        if (res[0] === 'alert') {
          setError(res[1]);
        }        
        const values = {
          data: {
            Name: res[1].username +"'s House",
            users_permissions_user: [res[1].id],
          }
        }
        const createHouseAndTasks = await axios.post(
          process.env.n8n_URL + "/2c304a04-d4d1-43fa-871b-9aad26bd2d94",
          values,
          {
            headers: {
              "Content-Type": "application/json"
            },
          }
        );
        setUser(res[1].username);
      }
    }


    fetchData();
  }, [router]);

  if (user) {
    router.push('/user');
  }
  if (error) {
    router.push(`/user?msg=${error}`);
  }
  return () => { console.log('Login with Google Login') };
}