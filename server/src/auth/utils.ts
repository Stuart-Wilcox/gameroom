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
  return {
    value: '1234',
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