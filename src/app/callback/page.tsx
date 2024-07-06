'use client';

import { useHandleSignInCallback } from '@logto/react';
import { useRouter } from 'next/navigation';

const Callback = () => {
  const router = useRouter();
  const { isLoading } = useHandleSignInCallback();

  // When it's working in progress
  if (isLoading) {
    return <div>Redirecting...</div>;
  }
  router.push('/');

  return null;
};

export default Callback;
