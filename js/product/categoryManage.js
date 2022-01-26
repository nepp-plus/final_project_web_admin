let getAllLargetCategoryList = () => {
  myAxios
    .get("/largecategory", {
      params: {},
    })
    .then(function (res) {
      console.log(res);

      let largeCategories = res.data.data.large_categories;
      largeCategories.forEach((element) => {
        console.log(element);

        let listItem = `
        <li>
        <span>${element.id}</span>
        <span><img src='${element.icon_url}' style='width:40px;height:40px;'></span>
        <span>${element.name}</span>
        <button categoryId=${element.id}>수정</button>
        </li>
        `;

        $("#largetCategoryList").append(listItem);
      });
    })
    .catch(function (error) {
      alert(error.response.data.message);
    });
};
