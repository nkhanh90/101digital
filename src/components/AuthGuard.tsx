import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMe } from '@/redux/auth/authSlice';
import { Container } from '@mui/material';
import { IReduxState } from '@/interface/IRedux';

type Props = {
  children: ReactElement;
  readonly role?: 'admin';
  readonly customText?: React.ReactNode;
};

export const AuthGuard: React.FC<Props> = ({ children, role, customText }) => {
  const { auth } = useSelector((state: IReduxState) => state);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!auth.data && !auth.isChecked) {
      dispatch(getMe());
    }
    if (auth.data || auth.isChecked) {
      setLoading(false);
    }
  }, [auth]);

  if (loading) {
    return <>loading...</>;
  }

  if (auth.data) {
    return <Container>{children}</Container>;
  }

  return (
    <section>
      <h2 className="text-center">Unauthorized</h2>
      <div className="text-center">
        {customText || "You don't have permission to access this page. Pleae contact an admin if you think something is wrong."}
      </div>
    </section>
  );
};
