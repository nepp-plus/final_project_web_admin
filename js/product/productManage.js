let currentLargeCategoryId = 0;
let currentSmallCategoryId = 0;

let getAllLargetCategoryList = async () => {
  currentLargeCategoryId = 0;
  myAxios
    .get("/largecategory", {
      params: {},
    })
    .then(function (res) {
      console.log(res);

      let largeCategories = res.data.data.large_categories;
      largeCategories.forEach((element) => {
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

let getLargeCategoryDetailById = async (id) => {
  currentLargeCategoryId = id;

  let res = await myAxios.get(`/largecategory/${id}/smallcategory`, {
    params: {},
  });

  let smallCategoryList = res.data.data.small_categories;
  return smallCategoryList;
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

let getProductList = (stats) => {
  myAxios
    .get("/admin/product", {
      params: {
        // status: status,
      },
    })
    .then(function (res) {
      console.log(res);
      let productArr = res.data.data.all_product_list;

      let productListTable = $("#productList");
      productListTable.empty();
      productArr.forEach((element) => {
        console.log(element);

        let tableRow = `
        <tr>
        <td>${element.id}</td>
        <td>${element.name}</td>
        <td>${element.original_price}</td>`;

        tableRow += `<td>${element.sale_price}</td>
        <td><ul>`;

        element.product_options.forEach((option) => {
          console.log(option);

          let optionItem = `<li style='color:#3971ff;'> - ${option.name} : `;
          option.option_values.forEach((value) => {
            optionItem += `${value.name}, `;
          });

          optionItem = optionItem.slice(0, -2);

          tableRow += optionItem;
        });

        tableRow += `</ul></td>
        <td><button categoryId=${element.id} onclick={editProduct(${element.id})}>수정</button></td>
        <td><button categoryId=${element.id} onclick={deleteProduct(${element.id})}>삭제</button></td>
        <div>
        </tr>
        `;

        productListTable.append(tableRow);
      });
    })
    .catch(function (error) {
      console.log(error);
    });
};

let getProductDetail = async (productId) => {
  const res = await myAxios.get(`/product/${productId}`, {
    params: {
      // status: status,
    },
  });
  return res.data.data.product;
};

let editProductByForm = (form) => {
  myAxios
    .patch("/admin/product", form)
    .then(function (res) {
      alert("상품 수정 완료");

      let url = `/html/product/product_manage.html`;
      $(location).attr("href", url);
    })
    .catch(function (error) {
      alert(error.response.data.message);
    });
};

let editProduct = (id) => {
  let url = `/html/product/product_edit.html?product_id=${id}`;
  $(location).attr("href", url);
};

let deleteProduct = (id) => {
  alert("삭제 : " + id);
};
