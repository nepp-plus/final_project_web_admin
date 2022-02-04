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

let patchOrderStatus = async (
  orderId,
  status,
  company_name,
  invoice_number
) => {
  let formData = new FormData();
  formData.append("order_id", orderId);
  formData.append("status", status);
  if (company_name != null) {
    formData.append("company_name", company_name);
  }
  if (invoice_number != null) {
    formData.append("invoice_number", statinvoice_numberus);
  }

  let res = await myAxios.patch("/admin/shipment", formData);

  console.log(res);

  // return res.data.data.order;
};
