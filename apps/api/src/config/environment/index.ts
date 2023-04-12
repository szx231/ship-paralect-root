import { configUtil } from 'utils';

const env = process.env.APP_ENV || 'development';

const base = {
  env,
  port: process.env.PORT || 3001,
  isDev: env === 'development' || env === 'development-docker',
  mongo: {
    connection: process.env.MONGO_CONNECTION || '',
    dbName: '',
  },
  apiUrl: '',
  webUrl: '',
  redis: process.env.REDIS_CONNECTION || 'redis://:super-secured-password@redis-master.redis.svc.cluster.local:6379',
  sendgridApiKey: process.env.SENDGRID_API_KEY || '',
  cloudStorage: {
    endpoint: process.env.CLOUD_STORAGE_ENDPOINT || '',
    credentials: {
      accessKeyId: process.env.CLOUD_STORAGE_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.CLOUD_STORAGE_SECRET_ACCESS_KEY || '',
    },
    bucket: process.env.CLOUD_STORAGE_BUCKET || '',
  },
  firebase: process.env.FIREBASE_CONFIG || {
    apiKey: 'AIzaSyC_A94gZ2flgxNVvPCbBwOfLiI9a74_xc4',
    authDomain: 'paralect-test-image.firebaseapp.com',
    projectId: 'paralect-test-image',
    storageBucket: 'paralect-test-image.appspot.com',
    messagingSenderId: '706125805621',
    appId: '1:706125805621:web:bf281de28cc5ea280d597c',
    measurementId: 'G-L7L4V2K75L',
    url: 'https://paralect-test-image.firebaseio.com',
    bucket: 'gs://paralect-test-image.appspot.com',
  },
  adminKey: process.env.ADMIN_KEY || '',
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  },
  mixpanel: {
    apiKey: process.env.MIXPANEL_API_KEY || '',
  },
};

const config = configUtil.loadConfig(base, env, __dirname);

export default config;
