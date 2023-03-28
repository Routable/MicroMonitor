# This Flask application shows basic system information
# such as disk space used vs disk space available, CPU usage, etc.
from flask import Flask, render_template, jsonify
import psutil, requests

app = Flask(__name__, static_url_path='/assets')

# Display system information on the home page   
@app.route('/')
def home():
    return render_template('index.html')

# API endpoint to get CPU usage
@app.route('/cpu')
def cpu():
    cpu_usage = psutil.cpu_percent(interval=1, percpu=True)
    return jsonify({'cpu_usage': cpu_usage})

# API endpoint to get disk usage
@app.route('/disk')
def disk():
    disks = psutil.disk_partitions()
    disk_usage = []
    for disk in disks:
        usage = psutil.disk_usage(disk.mountpoint)
        disk_usage.append({'name': disk.device, 'total': usage.total, 'used': usage.used})
    return jsonify({'disk_usage': disk_usage})

# API endpoint to get memory usage
@app.route('/memory')
def memory():
    memory_usage = psutil.virtual_memory()
    return jsonify({'memory_usage': {'total': memory_usage.total, 'used': memory_usage.used}})

# API endpoint to get network usage
@app.route('/network')
def network():
    network_usage = psutil.net_io_counters()
    return jsonify({'network_usage': {'bytes_sent': network_usage.bytes_sent, 'bytes_recv': network_usage.bytes_recv}})

# API endpoints to get temperatures
@app.route('/temperature')
def temperature():
    temps = psutil.sensors_temperatures()
    return jsonify({'temperature': temps})

# API endpoints to get users
@app.route('/users')
def users():
    users = psutil.users()
    return jsonify({'users': users})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=19999)
