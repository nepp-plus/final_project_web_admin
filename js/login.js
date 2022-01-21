let serverLogin = () => {
  let email = $("#inputEmail").val();
  let pw = $("#inputPassword").val();

  const form = new FormData();
  form.append("email", email);
  form.append("password", pw);

  myAxios
    .post("/user", form)
    .then(function (res) {
      let user = res.data.data.user;
      localStorage.setItem("userInfo", JSON.stringify(user));

      alert(`${user.name} 관리자님 환영합니다!`);

      let token = res.data.data.token;

      $.cookie("userToken", token);
      console.log("쿠키에 저장된 토큰 : ", $.cookie("userToken"));

      $(location).attr("href", "main.html");
    })
    .catch(function (error) {
      alert(error.response.data.message);
    });
};
