<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <title>結果頁面</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }
        #chart-container {
            max-width: 600px;
            margin: auto;
        }
    </style>
</head>
<body>

<h2>Block 5 與 Block 7 平均反應時間</h2>

<div id="chart-container">
    <canvas id="latencyChart" width="600" height="300"></canvas>
</div>

<script>
    // logs 資料會從 Minno.js 傳進來，假設變數名是 logs
    // 這裡用 JST 模板語法把 logs 轉成 JS 物件
    var logs = <%= JSON.stringify(logs) %>;

    // 篩選出 block = 5 和 block = 7 的資料
    var block5Logs = logs.filter(log => log.data && log.data.block === 5);
    var block7Logs = logs.filter(log => log.data && log.data.block === 7);

    // 計算平均反應時間函式
    function averageLatency(logs) {
        if(logs.length === 0) return 0;
        var total = logs.reduce(function(sum, log) {
            return sum + (log.latency || 0);
        }, 0);
        return total / logs.length;
    }

    var avgLatencyBlock5 = averageLatency(block5Logs);
    var avgLatencyBlock7 = averageLatency(block7Logs);

    // 使用 Chart.js 畫出柱狀圖
    var ctx = document.getElementById('latencyChart').getContext('2d');
    var latencyChart = new Chart(ctx, {
        type:
