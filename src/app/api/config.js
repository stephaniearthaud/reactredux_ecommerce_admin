export const API_URL = document.getElementById('root').getAttribute('data-api-url');

export function config() {
  return {
    headers: {
      'x-auth': localStorage.getItem('token')
    }
  };
}
