export default function useAuth() {
  const token = localStorage.getItem('token');
  const userName = localStorage.getItem('userName');

  return {
    token,
    userName,
  };
}
