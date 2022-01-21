let myAxios = axios.create({
  baseURL: "http://3.35.185.121",
  // baseURL: 'http://localhost:5000',
  timeout: 3000,
  headers: { "X-Http-Token": $.cookie("userToken") },
});
