let currentLargeCategoryId = 0;
let currentSmallCategoryId = 0;

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
        <option value=${element.id}>
        ${element.name}
        </option>
        `;

        $("#largeCategorySelect").append(listItem);
      });
    })
    .catch(function (error) {
      alert(error.response.data.message);
    });
};

let getLargeCategoryDetailById = (id) => {
  currentLargeCategoryId = id;

  myAxios
    .get(`/largecategory/${id}/smallcategory`, {
      params: {},
    })
    .then(function (res) {
      console.log(res);
      let smallCategoryListUl = $("#smallCategorySelect");
      smallCategoryListUl.empty();
      let smallCategoryList = res.data.data.small_categories;

      smallCategoryListUl.append(`<option value="-1">-선택-</option>`);

      smallCategoryList.forEach((element) => {
        let listItem = `
        <option value=${element.id}>
        ${element.name}
        </option>
        `;
        smallCategoryListUl.append(listItem);
      });
    })
    .catch(function (error) {
      alert(error.response.data.message);
    });
};

let addProductToServer = () => {
  const form = new FormData($("#productForm")[0]);
  let selectedSmallCategoryId = $("#smallCategorySelect").val();
  form.append("small_category_id", selectedSmallCategoryId);

  myAxios
    .post("/admin/product", form)
    .then(function (res) {
      alert("상품 추가 완료");

      let url = `/html/product/product_manage.html`;
      $(location).attr("href", url);
    })
    .catch(function (error) {
      alert(error.response.data.message);
    });
};
