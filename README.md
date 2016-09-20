#GPS Simulator
As it can be clear from the name, the "GPS Simulator" is needed for simulating GPS coordinates that are a part of the vehicle's route and for sending them to the "Binary Data Server" with some additional information (such as ID of the current object, type of the object, street view image near the current coordinate). By changing the number of application's instances using capabilities of the Stackato platform we can see the changing of the number of vehicles of the same type that are displayed on the UI in real time. Also we can add or remove new types of vehicles and these changes also will be displayed immediately.

## Installation:
+ Open the new instance of the CMD window with administrator privileges;
+ Target the API endpoint URL to your cloud instance:

    ```
    stackato target <url_address>
    ```
+ Start the login process:

    ```
    stackato login
    ```
And login to the current cloud instance using your username and password;
+ Go to the "fleet-mgmt" folder:

    ```
    cd /d <path>
    ```
+ Push the application to the Stackato cloud platform:

    ```
    stackato push -n
    ```
+ Wait until you will see the confirmation message "OK \<url_address\> deployed" in the console:

    ![Result of the Stackato push command](https://cloud.githubusercontent.com/assets/20835203/18668240/fc7d8836-7f3c-11e6-84cf-30d4b286933a.png)

+ Change the application settings using environment variables. They can be set in the Stackato admin panel or by using the following command:

    ```
    stackato env-add research-gps-simulator <variable_name> <value>
    ```
Note! All values except the INSTANCE_PORT (because it is just a number) should be enclosed in quotes (e.g. "127.0.0.1").

All settings available for the application are listed in the table below:

Description|Variable Name|Default Value
-----------|-----------|-----------
Address and port (if needed) of the "Binary Data Server"|BINARY_DATA_SERVER|http://research-binary-data-server.52.35.15.130.nip.io/telemetry
IP address of the "GPS Simulator" instance|INSTANCE_IP|127.0.0.1
Port which used by "GPS Simulator" application|INSTANCE_PORT|7011
The unique identifier of the object|DOCKER_ID|GUID which generated automatically for any new object 
Type of the object|DOCKER_TYPE|local

+ You can change the number of the instances of the same type by using the "Instances" control (Applications -> research-gps-simulator -> Instances):

    ![The "Instances" tab in the Stackato adminpanel](https://cloud.githubusercontent.com/assets/20835203/18668251/0c28c6ba-7f3d-11e6-80d8-3fd93bec2c3a.png)

+ If the application works fine you should see the JSON message with coordinates and other data when visiting the address which you seen after deployment of the application:

    ![JSON message sample](https://cloud.githubusercontent.com/assets/20835203/18668595/ffcbd108-7f3e-11e6-846f-77027d26fe56.png)

    Also, the new dots (each of which are represent a particular vehicle) should appear on the UI of the "Fleet Management" system (of course, all server-side applications should be started):

    ![The application works]()
