# Docker UI
The "Docker UI" application is the part of the system which responsible for representation of the data received by the "Sensors Data Server" to the end user. Through this component the user can see the position of all vehicles (data sent by GPS devices or from the "GPS Simulator") and their movement in real time.

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
+ Using you favorite text editor open the "config.json" file to edit application settings. The most interesting are the following lines:


    ```
    cd /d <path>
    ```
+ Save the changes and push the application to the Stackato cloud platform:

    ```
    stackato push -n
    ```
+ Wait until you will see the confirmation message "OK \<url_address\> deployed" in the console:

    ![Result of the Stackato push command]()

+ Open the UI in your browser using the address which you seen after deploying of the application. You should see somethings like this:

    ![The application works]()
