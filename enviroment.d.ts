// declare global {
//   namespace NodeJs {
//     interface ProcessEnv {
//       NODE_ENV: string;
//       PORT: number;
//       DATABASE: string;
//       DATABASE_PASSWORD: string;
//       JWT_SECRET: string;
//       JWT_EXPIRES_IN: string;
//     }
//   }
// }

export interface ProcessEnv {
  NODE_ENV: string;
  PORT: number;
  DATABASE: string;
  DATABASE_PASSWORD: string;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
  JWT_COOKIE_EXPIRES_IN: number;
}
