# Docker UI
The "Docker UI" application is the part of the "Fleet Management" system which responsible for representation of the data received by the "Sensors Data Server" to the end user. Through this component the user can see the position of all vehicles (the data which sent by GPS devices or from the "GPS Simulator") and their movement in real time.

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
+ Using you favorite text editor open the "config.json" file to edit application settings. The settings that you should change are located at the "connections" section of the file:

    ```
    {
    "server": "<Address of the "Sensors Data Server" server>",
    "port": <Port that used by "Sensors Data Server" server>
    },
    ```
Note! The application can receive the information from different sources for displaying it at the one page. Thus, you can specify more than one instance of the "Sensors Data Server" server in the "connections" array.
+ Save the changes and push the application to the Stackato cloud platform:

    ```
    stackato push -n
    ```
+ Wait until you will see the confirmation message "OK \<url_address\> deployed" in the console:

    ![Result of the Stackato push command]()

+ By the default the application starts at the 7000 port but you can change this by using the environment variable PORT as follows:

    ```
    stackato env-add research-telemetry-ui PORT <new_value>
    ```
+ Open the UI in your browser using the address which you seen after deploying of the application. You should see somethings like this:

    ![The application works](https://cloud.githubusercontent.com/assets/20835203/18630144/353ee784-7e73-11e6-801d-aed60c2eeb7b.png)
