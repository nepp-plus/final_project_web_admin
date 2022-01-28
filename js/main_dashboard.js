let getDashboardData = async () => {
  let res = await myAxios.get("/admin/dashboard", {
    params: {
      // status: status,
    },
  });
  return res.data.data;
};

let makeChartData = (amount_infos, user_infos) => {
  var ctx = document.getElementById("myAreaChart");

  let dates = [];
  let amounts = [];
  let new_users = [];

  amount_infos.forEach((element) => {
    console.log(element);
    dates.push(element.date.substr(5, 5));
  });

  let maxAmount = 0;

  amount_infos.forEach((element) => {
    amounts.push(element.amount);

    if (element.amount > maxAmount) {
      maxAmount = element.amount;
    }
  });

  let max_line_chart = Math.ceil(maxAmount / 100000) * 100000;

  let maxUserCount = 0;

  user_infos.forEach((element) => {
    console.log(element);
    new_users.push(element.user_counts);
    if (element.user_counts > maxUserCount) {
      maxUserCount = element.user_counts;
    }
  });

  let max_bar_chart = Math.ceil(maxUserCount / 10) * 10;

  var myLineChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: dates,
      datasets: [
        {
          label: "일별 매출액",
          lineTension: 0.3,
          backgroundColor: "rgba(2,117,216,0.2)",
          borderColor: "rgba(2,117,216,1)",
          pointRadius: 5,
          pointBackgroundColor: "rgba(2,117,216,1)",
          pointBorderColor: "rgba(255,255,255,0.8)",
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(2,117,216,1)",
          pointHitRadius: 50,
          pointBorderWidth: 2,
          data: amounts,
        },
      ],
    },
    options: {
      scales: {
        xAxes: [
          {
            time: {
              unit: "date",
            },
            gridLines: {
              display: false,
            },
            ticks: {
              maxTicksLimit: 7,
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              min: 0,
              max: max_line_chart,
              maxTicksLimit: 5,
            },
            gridLines: {
              color: "rgba(0, 0, 0, .125)",
            },
          },
        ],
      },
      legend: {
        display: false,
      },
    },
  });

  // Bar Chart Example
  var ctx = document.getElementById("myBarChart");
  var myBarChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: dates,
      datasets: [
        {
          label: "신규 회원 수",
          backgroundColor: "rgba(2,117,216,1)",
          borderColor: "rgba(2,117,216,1)",
          data: new_users,
        },
      ],
    },
    options: {
      scales: {
        xAxes: [
          {
            time: {
              unit: "month",
            },
            gridLines: {
              display: false,
            },
            ticks: {
              maxTicksLimit: 6,
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              min: 0,
              max: max_bar_chart,
              maxTicksLimit: 5,
            },
            gridLines: {
              display: true,
            },
          },
        ],
      },
      legend: {
        display: false,
      },
    },
  });
};
