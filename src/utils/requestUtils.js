export const getRequestHeaders = () => {
  const userToken = localStorage.getItem("crm_user_token");

  return { 
    headers: { 'Authorization': userToken},
  };
}