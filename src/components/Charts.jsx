import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend, PointElement } from 'chart.js';

// Chart.js plaginlarini ro‘yxatdan o‘tkazish
ChartJS.register(LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend, PointElement);

const Charts = ({ completedTasksPerMonth }) => {
  const data = {
    labels: Object.keys(completedTasksPerMonth), // Months
    datasets: [
      {
        label: "Completed Tasks",
        data: Object.values(completedTasksPerMonth), // Number of completed tasks per month
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Tasks Completed Per Month',
      },
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Month',
        }
      },
      y: {
        title: {
          display: true,
          text: 'Completed Tasks',
        },
        beginAtZero: true,
        precision: 0
      }
    }
  };

  return (
    <div className=''>
      <Line data={data} options={options} />
    </div>
  );
}


export default Charts;
