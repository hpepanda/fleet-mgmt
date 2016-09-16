The main purpose of "Sensors Data Server" is to aggregate the data which stored in the MongoDB database and send them to the clients through WebSockets. Like any other component of the system it can work locally of course, but for best scaling capabilities it should be deployed on the Stackato platform.

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
+ Wait until you will see the confirmation message "OK <url_address> deployed" in the console:

    ![Result of the Stackato push command](https://cloud.githubusercontent.com/assets/20835203/18587187/5a9e8e0e-7c29-11e6-8fe0-dbd592a8545d.png)

+ Now, you can use the application with default settings or change these settings by using the following command (you could also use the Stackato admin panel for this purposes):

    ```
    stackato env-add research-sensors-data-provider <variable_name> <value>
    ```
Note! All values except the PORT and POINT_TTL (because they are just a numbers) should be enclosed in quotes (e.g. "mongodb://localhost:27017/db").

All application's settings can be configured through environment variables listed below:

Description|Variable Name|Default Value
-----------|-----------|-----------
Port that used by the application|PORT|5001
Address of the MongoDB server and the name of the database|BINARY_DATABASE or MONGODB_URL|mongodb://localhost:27017/docker
?|POINT_TTL|60
The URL address of the "Config Server" (if it is a part of the system) and full path to the API that responsible for sending of configuration information|CONFIG_SERVER_URI|http://192.168.100.194:8084/api/cfg/

+ If the application works fine you should see the following message in your browser’s window when visiting the address \<url_address\>/api:

    ![The application works](https://cloud.githubusercontent.com/assets/20835203/18587262/bf16c680-7c29-11e6-9442-4ebefbfd2326.png)
