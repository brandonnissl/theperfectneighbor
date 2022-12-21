import React, { useEffect, useContext } from 'react';
import useRouter from 'next/router';
import { UserContext } from '../../context/user';
import ResetForm from '../../components/ResetForm';

const Resetpassword = () => {
  const { user, checkLogin } = useContext(UserContext);
  useEffect(async () => {
    const res = await checkLogin();
    if (res.status === 200) {
    }
  }, []);
  if (user) {
    useRouter.push('/user');
  }

  return <ResetForm />;
};

export default Resetpassword;