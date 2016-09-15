The system component named "Binary Data Server" responsible for processing and saving to DB of data that received from the real GPS devices or from the "GPS Simulator" that emulates its work programmatically. Like any other component of the system it can work locally of course, but for best scaling capabilities it should be deployed on the Stackato platform.

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

    ![Result of the Stackato push command](https://cloud.githubusercontent.com/assets/20835203/18481875/98a302d8-79e6-11e6-84f8-715a28e6b299.png)

+ Now, you can use the application with default settings or change these settings by using the following command (you could also use the Stackato admin panel for this purposes):

    ```
    stackato env-add research-binary-data-server <variable_name> <value>
    ```
Note! All values except the PORT (because it is just a number) should be enclosed in quotes (e.g. "mongodb://localhost:27017/db")

All application's settings can be configured through environment variables listed below:

Description|Variable Name|Default Value
-----------|-----------|-----------
Port that used by the application|PORT|8020
Address of the MongoDB server and the name of the database|MONGODB_URL|mongodb://localhost:27017/docker
The data should be saved into the DB ("false") or only in cache ("true")|USE_ONLY_CACHE|true

+ If the application works fine you should see the following message in your browser’s window when visiting the address \<url_address\>/api:

    ![The application works]()
