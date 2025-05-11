let chartInstance = null;

const ctx = document.getElementById("myChart");

fetch("chart.php")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    createChart(data, "line");
  });

function createChart(chartData, type) {
  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(ctx, {
    type: type,
    data: {
      labels: chartData.map((row) => row.date),
      datasets: [
        {
          label: "Results",
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

function refreshChart() {
  fetch("chart.php")
    .then((response) => response.json())
    .then((data) => {
      createChart(data, "line");
    });
}

document
  .getElementById("measurementForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const messageDiv = document.getElementById("message");

    try {
      const response = await fetch("save_result.php", {
        method: "POST",
        body: formData,
      });

      const result = await response.text();

      console.log(result);

      if (result.includes("saved")) {
        messageDiv.textContent = "Result saved successfully!";
        refreshChart(); // <-- DODAJ TO TU
      } else {
        messageDiv.textContent = "Failed to save result";
      }

      messageDiv.className = "message-visible";

      setTimeout(() => {
        messageDiv.className = "message-hidden";
      }, 3000);

      e.target.reset();
    } catch (error) {
      messageDiv.textContent = "Connection error";
      messageDiv.className = "message-visible";
    }
  });
