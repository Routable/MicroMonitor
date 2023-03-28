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