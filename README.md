# IOT Fan Control App
## Introduce
This application is used to control electrical equipment such as fans and air conditioners in buildings of Bach Khoa University
Besides, a server will receive the data from the sensor about the temperature and humidity and save the data to the server. This data is displayed in the user's app and if the temperature is too high or the humidity is too much, the server will automatically turn on the fan and air conditioner in the room at a reasonable time
This application is used for my University's multidisciplinary project internship subject

## 4 main components of the system:
### This mobile app
This app is deployed with Expo - An environment for building react native app. 
2 main threads of the app:

**For users:** the account created in the sign in page is the user account with the main functions:
* Request a room for controling deivces in that room
* View activities logs
* Account operations

**For admin:** only one account "admin@gmail.com" when logging into the app will be directed to the admin interface. Admin account can:
* Create/delete/modify rooms
* Change mode of a room: Auto mode (turn on/off devices based on temperature and humidity) or Manual mode
* Create/delete/modify devices in a room
* Manage feeds of the sensors and feeds of the deivces
* Grant and revoke users control rights
* View activites logs

### Firebase 
Use firebase to store user data as well as room data and devices, sensors

### Server
The server has 2 main modules which are:
**Notification module**: when the user sends a request for room access permission to the admin, the system will send a notification to the admin's account, and when the admin grants/deny/revokes room accessible, the system also sends notify to the respective user accounts.
**IOT communication**: This module connects to adafruit server to send/receive device control signals/data from sensors.

### MQTT server: We used Adafruit server to simulate real devices

## Review
* App for admin
![alt](./assets/git_app_screen/admin.png)
* App for user
