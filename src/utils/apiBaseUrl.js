//나중에 배포할때 env 세팅을 위한 부분

const host = process.env.REACT_APP_API_ENDPOINT || 'localhost';
const port = 3000;

const API_ENDPOINT = `http://${host}:${port}`;
export { API_ENDPOINT };
