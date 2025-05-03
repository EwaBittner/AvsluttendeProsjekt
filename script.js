const ctx = document.getElementById("myChart");

fetch("chart.php")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    createChart(data, "line");
  });

function createChart(chartData, type) {
  new Chart(ctx, {
    type: "type",
    data: {
      labels: chartData.map((row) => row.date),
      datasets: [
        {
          label: "# value",
          data: chartData.map((row) => row.value),
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}
