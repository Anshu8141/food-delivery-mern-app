import React, { useState, useEffect } from 'react';
import { foodService, categoryService } from '../../services/foodService';
import { orderService } from '../../services/orderService';
import Loading from '../../components/Loading';
import '../../styles/AdminDashboard.css';

import { Bar } from "react-chartjs-2";
import {
Chart as ChartJS,
CategoryScale,
LinearScale,
BarElement,
Title,
Tooltip,
Legend
} from "chart.js";

ChartJS.register(
CategoryScale,
LinearScale,
BarElement,
Title,
Tooltip,
Legend
);

const Dashboard = () => {

  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    deliveredOrders: 0,
  });

  const [foodCount, setFoodCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {

    try {

      setLoading(true);

      const [orderRes, foodsRes, categoriesRes] = await Promise.all([
        orderService.getOrderStats(),
        foodService.getAllFoods(),
        categoryService.getCategories(),
      ]);

      // Orders
      setStats(orderRes.stats || {});

      // Foods Count Fix
      if (Array.isArray(foodsRes)) {
        setFoodCount(foodsRes.length);
      } else {
        setFoodCount((foodsRes.foods || []).length);
      }

      // Categories Count Fix
      if (Array.isArray(categoriesRes)) {
        setCategoryCount(categoriesRes.length);
      } else {
        setCategoryCount((categoriesRes.categories || []).length);
      }

    } catch (error) {

      console.error('Error fetching stats:', error);

    } finally {

      setLoading(false);

    }

  };

  if (loading) return <Loading />;

  const chartData = {
    labels: ["Orders", "Foods", "Categories", "Revenue"],
    datasets: [
      {
        label: "Admin Statistics",
        data: [
          stats.totalOrders,
          foodCount,
          categoryCount,
          stats.totalRevenue / 100
        ],
        backgroundColor: [
          "#ff6b6b",
          "#feca57",
          "#1dd1a1",
          "#54a0ff"
        ],
        borderRadius: 6
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top"
      },
      title: {
        display: true,
        text: "Platform Analytics"
      }
    }
  };

  return (

    <div className="admin-dashboard">

      <h1>Admin Overview</h1>

      <div className="stats-cards">

        <div className="card">
          <h3>Total Orders</h3>
          <p>{stats.totalOrders}</p>
        </div>

        <div className="card">
          <h3>Total Revenue</h3>
          <p>₹{stats.totalRevenue.toLocaleString()}</p>
        </div>

        <div className="card">
          <h3>Foods</h3>
          <p>{foodCount}</p>
        </div>

        <div className="card">
          <h3>Categories</h3>
          <p>{categoryCount}</p>
        </div>

      </div>

      <div className="chart-container">
        <Bar data={chartData} options={chartOptions} />
      </div>

    </div>

  );

};

export default Dashboard;