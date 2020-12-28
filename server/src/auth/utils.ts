import * as config from '../config';

/**
 * Gets minutes to live into the future
 * @param ttl Minutes to live
 */
const getExpiration = (offsetTimeMinutes: number) => {
  const currentTimeMs = ((new Date()).getTime());
  const offsetTimeMs = offsetTimeMinutes * 60 * 1000;
  const expirationTimeMs = currentTimeMs + offsetTimeMs;
  return new Date(expirationTimeMs);
};

const generateMFAToken = () => {
  let value = '';
  if (config.USE_REAL_MFA) {
    for (let i = 0; i < config.MFA_TOKEN_DIGITS; i++) {
      // add random digit between 0-9
      value += `${Math.floor(10 * Math.random())}`
    }
  }
  else {
    value = '1234';
  }

  return {
    value,
    expires: getExpiration(5),
  };
};

const sendMFAToken = (email: string, mfaToken: string) => {
  console.log(`Sending mfa token ${mfaToken} to ${email}`);
  // TODO send mfa token
};

const generateAndSendMFAToken = (email: string) => {
  const mfaToken = generateMFAToken();
  setImmediate(() => sendMFAToken(email, mfaToken.value));
  return mfaToken;
};

export default generateAndSendMFAToken;