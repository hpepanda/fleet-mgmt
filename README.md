# Fleet Management System
The Fleet Management System it is a navigation software which displays moving of the vehicles on the map in the real time. The main goal of the system is not track vehicles, but to demonstrate advantages that provides the Stackato platform for easy scaling of any types of applications in real time. Because the Stackato platform allows us to increase/decrease instances of the applications by simply changing the settings in the GUI of the administration panel.

![Fleet Management UI]()

## Prerequirements
Before starting the installation, please check that following additional software installed and configured on your PC:
+ [Git](https://git-scm.com/download/);
+ [Helion Stackato Client](http://downloads.stackato.com/client/) (the executable of which [should be added](https://docs.stackato.com/user/client/) to the PATH system variable).

Also, of cource you should have the account on the Stackato platform if you want deploy the software on it.

## Repository
The software needed for work of the system can be found in this repository. All parts of the system are distributed through the different branches, so, for installing a specific application in generally you need to:
+ Clone the current repository to your PC:

    ```
    git clone https://github.com/hpepanda/fleet-mgmt.git && cd fleet-mgmt
    ```
+ Switch from master to the other branch depending on what application you need:

    ```
    git checkout <server_name>
    ```

For your convenience, all the software which can be found in the current repository listed in the table below:

Server Name|Branch Name|Description
-----------|-----------|-----------
Binary Data Server|binary-server|This component used for recieving events (sent from the "GPS Simulator" or real GPS device) and storing these events into the MongoDB database
Sensors Data Server|data-server|The application that aggregates data from MongoDB and streams it to the clients, connected throug WebSockets
User Interface|ui|The component that responsible for representation of data to the end user
GPS Simulator|gps-simulator|The application that emulates sending of data from GPS to the Binary Data Server. Can be used for testing purposes or if you don't have the real hardware GPS tracker
