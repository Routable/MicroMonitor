# MicroMonitor

After realizing that most server monitoring tools are very intrusive, or use an unnecessary amount of resources,
I've decided to build my own.

This application uses Flask, with the psutil library. Several common checks can be made
by calling the Flask endpoints: cpu, disk, memory, network, temperature and users.

A lightweight front end has been provided that utilizes some basic bootstrap/js/jquery functionality
to update the front end page every few seconds with realtime data.

The best part of the project, is that this uses nearly no system resources unless you're actively browsing the page.

If you are using this for local only usage (such as me), and don't care about it being 'production ready'
you can run the application with nohup python3 app.py &, to have it run in the default WSGI server,
and send output to nohup.out in a detatched mode.

The use case for this is basic monitoring of my home bench server for quick troubleshooting, monitoring, and pure
curiosity.

This software is provided AS-IS, and users accept all liability of its use.

# Instructions
## Requirements: Flask, or a virtualenv with Flask, and Python3. 
1. Once Flask is present on the system, the application can be run via python3 app.py (flask run will run the application on 127.0.0.1:19999, instead of 0.0.0.0:19999 making it inaccessible from other devices)
2. Once it is running, access the application via <ip-of-server>:19999
3. To run in a detached setting, you can use the command nohup python3 app.py & to have all output go to nohup.out, and effectively run it in a detached setting. This should only be used in a non-production environment, in a local environment.
