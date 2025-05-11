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

      messageDiv.textContent = result.includes("saved")
        ? "Result saved successfully!"
        : "Failed to save result";
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

// Debugging
fetch("save_result.php", {
  method: "POST",
  body: formData,
})
  .then((response) => response.text()) // zmienione z .json()
  .then((result) => console.log(result)); // tymczasowo
