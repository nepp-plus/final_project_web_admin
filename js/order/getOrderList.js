$(document).ready(() => {
  let now = new Date();
  $("#startDate").val(now.toISOString().substr(0, 10));
  $("#endDate").val(now.toISOString().substr(0, 10));
});

let getOrderList = (status) => {
  let sdate = $("#startDate").val();
  let edate = $("#endDate").val();

  console.log(sdate);
  console.log(edate);

  myAxios
    .get("/admin/shipment", {
      params: {
        status: status,
      },
    })
    .then(function (res) {
      let shipmentArr = res.data.data.shipment;

      let orderListUl = $("#orderList");
      orderListUl.empty();
      shipmentArr.forEach((element) => {
        console.log(element);

        let li = `
        <li>
        <div>
        <span>${"테스트"}</span>
        <div>
        </li>
        `;

        orderListUl.append(li);
      });
    })
    .catch(function (error) {
      alert(error.response.data.message);
    });
};
