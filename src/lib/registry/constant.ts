import type { LogtoConfig } from '@logto/react';

export const logtoConfig: LogtoConfig = {
  endpoint: 'https://workspace.seitrace.com/',
  appId: '5xronvmk2op0gyzo9njcs',
  resources: ['https://workspace.app.seitrace.com/api'],
};

export const LogtoRedirectURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/callback'
    : 'https://sei-wasmd.solo.engineer/callback';
