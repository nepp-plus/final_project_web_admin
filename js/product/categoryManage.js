let currentLargeCategoryId = 0;

let getAllLargetCategoryList = () => {
  currentLargeCategoryId = 0;
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

let getLargeCategoryDetailById = (id) => {
  currentLargeCategoryId = id;
  myAxios
    .get(`/largecategory/${id}`, {
      params: {},
    })
    .then(function (res) {
      console.log(res);
      let category = res.data.data.large_category;

      $("#categoryIcon").attr("src", category.icon_url);
      $("#categoryName").val(category.name);
    })
    .catch(function (error) {
      alert(error.response.data.message);
    });

  myAxios
    .get(`/largecategory/${id}/smallcategory`, {
      params: {},
    })
    .then(function (res) {
      console.log(res);
      let smallCategoryListUl = $("#smallCategoryList");
      smallCategoryListUl.empty();
      let smallCategoryList = res.data.data.small_categories;

      smallCategoryList.forEach((element) => {
        let li = `
        <li>
        <div smallCategoryId=${element.id}>
        <span>${element.name}</span>
        <button onclick="editSmallCategory(${element.id}, '${element.name}')">수정하기</button>
        <div>
        </li>
        `;
        smallCategoryListUl.append(li);
      });
    })
    .catch(function (error) {
      alert(error.response.data.message);
    });
};

let editSmallCategory = (id, name) => {
  let editName = prompt("변경할 소분류 이름", name);

  if (!(editName == null || editName == "")) {
    let form = new FormData();
    form.append("small_category_id", id);
    form.append("field", "name");
    form.append("value", editName);
    myAxios
      .patch("/admin/smallcategory", form)
      .then(function (res) {
        alert("소분류 수정 완료");
        getLargeCategoryDetailById(currentLargeCategoryId);
      })
      .catch(function (error) {
        alert(error.response.data.message);
      });
  }
};

let addSmallCategory = () => {
  let editName = prompt("추가할 소분류 이름");

  if (!(editName == null || editName == "")) {
    let form = new FormData();
    form.append("large_category_id", currentLargeCategoryId);
    form.append("name", editName);
    myAxios
      .post("/admin/smallcategory", form)
      .then(function (res) {
        alert("소분류 추가 완료");
        getLargeCategoryDetailById(currentLargeCategoryId);
      })
      .catch(function (error) {
        alert(error.response.data.message);
      });
  }
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
