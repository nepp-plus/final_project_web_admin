let myAxios = axios.create({
  baseURL: "https://api.copang.xyz",
  // baseURL: "http://localhost:5000",
  timeout: 3000,
  headers: { "X-Http-Token": $.cookie("userToken") },
});
