const dotenv = require('dotenv');
const path = require('path');

export function loadFrostQAConfig() {
  dotenv.config({ path: path.resolve(__dirname, '../../config/.env') });

  return {
    baseURL: process.env.BASE_URL || 'https://automationexercise.com',
    env: process.env.ENV || 'qa',
    retries: Number(process.env.RETRIES || 1),
  };
}

