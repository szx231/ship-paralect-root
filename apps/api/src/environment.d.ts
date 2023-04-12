declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_ENV: 'development' | 'staging' | 'production' | 'development-docker';
      NODE_ENV: 'development' | 'staging' | 'production';
      PORT?: number;
      PWD: string;
      TEST: 'test';
      FIREBASE_CONFIG: {
        apiKey: string;
        authDomain: string;
        projectId: string;
        storageBucket: string;
        messagingSenderId: string;
        appId: string;
        measurementId: string;
        url: string;
      };
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
