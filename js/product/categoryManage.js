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
        <button categoryId=${element.id} onclick={editLargeCategory(${element.id})}>수정</button>
        </li>
        `;

        $("#largetCategoryList").append(listItem);
      });
    })
    .catch(function (error) {
      alert(error.response.data.message);
    });
};

let postLargeCategory = () => {
  const form = new FormData($("#categoryForm")[0]);
  myAxios
    .post("/admin/largecategory", form)
    .then(function (res) {
      alert("대분류 추가 완료");

      let url = `/html/product/category_add.html`;
      $(location).attr("href", url);
    })
    .catch(function (error) {
      alert(error.response.data.message);
    });
};

let patchLargeCategory = (field, largeCategoryId) => {
  let form = null;

  if (field == "name") {
    form = new FormData($("#editCategoryNameForm")[0]);
  } else if (field == "icon_url") {
    form = new FormData($("#editCategoryIconForm")[0]);
  }

  form.append("large_category_id", largeCategoryId);
  form.append("field", field);
  myAxios
    .patch("/admin/largecategory", form)
    .then(function (res) {
      alert("대분류 수정 완료");

      let url = `/html/product/large_category_manage.html`;
      $(location).attr("href", url);
    })
    .catch(function (error) {
      alert(error.response.data.message);
    });
};
