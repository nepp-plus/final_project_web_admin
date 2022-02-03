$(document).ready(() => {
  let now = new Date();
  $("#startDate").val(now.toISOString().substr(0, 10));
  $("#endDate").val(now.toISOString().substr(0, 10));
});

let getOrderList = async (status) => {
  let sdate = $("#startDate").val();
  let edate = $("#endDate").val();

  console.log(sdate);
  console.log(edate);

  let res = await myAxios.get("/admin/order", {
    params: {
      status: status,
    },
  });

  return res.data.data.order;
};
