export const cardConfig = {
  titleLines: 3,
  titleHeight: '70px',
  locationLines: 2,
  truncateThreshold: 55,
};

export const env = process.env.REACT_APP_NODE_ENV || 'development';
export const isDev = env === 'development';
export const isStaging = env === 'staging';
export const isProd = env === 'production';

export const serverBaseURL = (() => {
  if (env === 'production')
    return process.env.REACT_APP_PARSE_SERVER_URL || 'https://api.please.com';
  if (env === 'staging')
    return process.env.REACT_APP_PARSE_SERVER_URL || 'https://staging-api.please.com';
  return process.env.REACT_APP_PARSE_SERVER_URL || 'https://api.please.docker';
})();
