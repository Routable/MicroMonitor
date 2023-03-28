 $(document).ready(function () {
    setInterval(function () {
      $.get('/cpu', function (data) {
        var cpuUsage = '<table class="table"><thead><tr><th>Core</th><th>Usage</th></tr></thead><tbody>';
        var totalUsage = 0;
        for (var i = 0; i < data.cpu_usage.length; i++) {
          var core = i + 1;
          var usage = data.cpu_usage[i];
          cpuUsage += '<tr class="core-row core-' + core + '" style="display:none"><td>' + core + '</td><td>';
          if (usage < 50) {
            cpuUsage += '<span style="color:green">' + usage + '%</span>';
          } else if (usage < 70) {
            cpuUsage += '<span style="color:orange">' + usage + '%</span>';
          } else {
            cpuUsage += '<span style="color:red">' + usage + '%</span>';
          }
          cpuUsage += '</td></tr>';
          totalUsage += usage;
        }
        var averageUsage = totalUsage / data.cpu_usage.length;
        cpuUsage += '<tr><td><strong>Average</strong></td><td>';
        if (averageUsage < 50) {
          cpuUsage += '<strong><span style="color:green">' + averageUsage.toFixed(2) + '%</span></strong>';
        } else if (averageUsage < 70) {
          cpuUsage += '<strong><span style="color:orange">' + averageUsage.toFixed(2) + '%</span></strong>';
        } else {
          cpuUsage += '<strong><span style="color:red">' + averageUsage.toFixed(2) + '%</span></strong>';
        }
        cpuUsage += '</td></tr>';
        cpuUsage += '</tbody></table>';
        $('#cpu-usage-inner').html(cpuUsage);

        $('#cpu-usage-inner table').on('click', function () {
          $('.core-row').toggle();
        });
      });
    }, 2000);

    setInterval(function () {
      $.get('/memory', function (data) {
        var totalMemory = data.memory_usage.total / 1024 / 1024;
        var usedMemory = data.memory_usage.used / 1024 / 1024;
        var usedMemoryPercent = usedMemory / totalMemory * 100;
        var color = '';
        if (usedMemoryPercent < 50) {
          color = 'green';
        } else if (usedMemoryPercent < 70) {
          color = 'orange';
        } else {
          color = 'red';
        }
        var memoryUsage = '<table class="table"><thead><tr><th>Total Memory</th><th>Used Memory</th><th>Used Memory %</th></tr></thead><tbody>';
        memoryUsage += '<tr><td>' + totalMemory.toFixed(2) + ' GB</td><td>' + usedMemory.toFixed(2) + ' GB</td><td style="color:' + color + '">' + usedMemoryPercent.toFixed(2) + '%</td></tr>';
        memoryUsage += '</tbody></table>';
        $('#memory-usage-inner').html(memoryUsage);
      });
    }, 2000);

    setInterval(function () {
      $.get('/network', function (data) {
        var bytesSent = data.network_usage.bytes_sent;
        var bytesRecv = data.network_usage.bytes_recv;
        var sentGB = bytesSent / (1024 * 1024 * 1024);
        var recvGB = bytesRecv / (1024 * 1024 * 1024);
        var networkUsage = '<table class="table"><thead><tr><th>Gigabytes Sent</th><th>Gigabytes Received</th></tr></thead><tbody>';
        networkUsage += '<tr><td>' + sentGB.toFixed(2) + ' GB</td><td>' + recvGB.toFixed(2) + ' GB</td></tr>';
        networkUsage += '</tbody></table>';
        $('#network-usage-inner').html(networkUsage);
      });
    }, 2000);

    setInterval(function () {
      $.get('/disk', function (data) {
        var relevantDrives = data.disk_usage.filter(function (drive) {
          return !drive.name.toLowerCase().includes('loop');
        });
        var diskUsage = '<table class="table"><thead><tr><th>Name</th><th>Total Space</th><th>Used Space</th><th>Free Space</th><th>Usage</th></tr></thead><tbody>';
        for (var i = 0; i < relevantDrives.length; i++) {
          var name = relevantDrives[i].name;
          var total = relevantDrives[i].total;
          var used = relevantDrives[i].used;
          var free = total - used;
          var usedPercent = used / total * 100;
          var colorClass = '';
          if (usedPercent < 50) {
            colorClass = 'text-success';
          } else if (usedPercent < 75) {
            colorClass = 'text-warning';
          } else {
            colorClass = 'text-danger';
          }
          diskUsage += '<tr><td>' + name + '</td><td>' + (total / (1024 * 1024 * 1024)).toFixed(2) + ' GB</td><td>' + (used / (1024 * 1024 * 1024)).toFixed(2) + ' GB</td><td>' + (free / (1024 * 1024 * 1024)).toFixed(2) + ' GB</td><td class="' + colorClass + '">' + usedPercent.toFixed(2) + '% used</td></tr>';
        }
        diskUsage += '</tbody></table>';
        $('#disk-usage-inner').html(diskUsage);
      });
    }, 10000);

    setInterval(function() {
      $.get('/temperature', function(data) {  // Replace with the URL that returns the temperature readings
        var sensors = data.temperature;
        var temperatureHTML = '<div class="container-fluid">';
        temperatureHTML += '<h3>Temperatures</h3>';
        temperatureHTML += '<div id="temperatures-inner">';
        temperatureHTML += '<div class="spinner-border" role="status">';
        temperatureHTML += '<span class="visually-hidden">Loading...</span>';
        temperatureHTML += '</div>';
    
        if (sensors && Object.keys(sensors).length > 0) {
          temperatureHTML = '<table class="table">';
          temperatureHTML += '<thead><tr><th>Sensor</th><th>Temperature</th><th>Min</th><th>Max</th></tr></thead>';
          temperatureHTML += '<tbody>';
    
          Object.keys(sensors).forEach(function(sensor) {
            var readings = sensors[sensor];
            readings.forEach(function(reading) {
              temperatureHTML += '<tr>';
              temperatureHTML += '<td>' + sensor + (reading[0] ? ' ' + reading[0] : '') + '</td>';
              temperatureHTML += '<td>' + reading[1] + '°C</td>';
              temperatureHTML += '<td>' + reading[2] + '°C</td>';
              temperatureHTML += '<td>' + reading[3] + '°C</td>';
              temperatureHTML += '</tr>';
            });
          });
    
          temperatureHTML += '</tbody></table>';
        }
        temperatureHTML += '</div></div>';
        $('#temperatures-inner').html(temperatureHTML);
      });
    }, 2000);

    $.get('/users', function (data) {
      var usersTable = '<table class="table"><thead><tr><th>Username</th><th>Terminal</th><th>Host</th><th>Started</th></tr></thead><tbody>';
      for (var i = 0; i < data.users.length; i++) {
        var user = data.users[i];
        var startedDate = new Date(user[3]*1000); // convert timestamp to Date object
        var startedStr = startedDate.toLocaleString(); // convert Date object to human-readable string
        usersTable += '<tr><td>' + user[0] + '</td><td>' + user[1] + '</td><td>' + user[2] + '</td><td>' + startedStr + '</td></tr>';
      }
      usersTable += '</tbody></table>';
      $('#users-table-inner').html(usersTable);
    });
  });