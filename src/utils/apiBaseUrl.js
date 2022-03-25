//나중에 배포할때 env 세팅을 위한 부분
// const host = process.env.REACT_APP_API_ENDPOINT || 'localhost';
// const port = 3000;

const host = process.env.REACT_APP_API_HOST ?? 'localhost';
const port = process.env.REACT_APP_API_PORT ?? 3000;

const API_ENDPOINT = `${host}:${port}`;

export { API_ENDPOINT };
