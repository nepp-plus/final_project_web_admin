if ($.cookie("userToken")) {
  // 토큰이 저장되어있다면? 내 정보 호출
  // 응답이 제대로 오면 메인으로, 아니면 로그인
  myAxios
    .get("/user", {
      params: {
        // project에선 아직 첨부할 자료가 없어서 비워둔다
      },
    })
    .then(function (res) {
      // 내 사용자 정보를 브라우저에 저장 => 모든 페이지에서 활용 준비
      // localStorage 를 활용해서 저장. => String으로 저장.
      // 사용자 정보를 String으로 통째로 변환해서 저장.

      // JSON 객체를 => String으로 변환 처리.  JSON.stringify
      let userInfoStr = JSON.stringify(res.data.data.user);

      // 변환된 스트링값을 localStorage에 저장
      localStorage.setItem("userInfo", userInfoStr);

      // 성공적으로 응답을 가져오면 메인으로 이동.

      $(location).attr("href", "main.html");
    })
    .catch(function (error) {
      // 내 정보를 가져오는데 실패하면 로그인 화면으로
      $(location).attr("href", "login.html");
    });
} else {
  $(location).attr("href", "login.html");
}
