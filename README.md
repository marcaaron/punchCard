# Punch Card
## A vanilla JS based punch card app
### (Node, Express, MongoDB)

![Front page of app](https://image.ibb.co/dza1bm/Screen_Shot_81.png)
![Punch Archive](https://image.ibb.co/mfnpwm/Screen_Shot_82.png)

Built using some starter code from Wes Bos' course on NodeJS. This app is coded mostly in vanilla JS, Node, Express, and Pug. It is a very basic time card for users to log their hours/breaks and hooks into a MongoDB database to record at the end of the day. Local storage saves the state prior to pushing to database so there's no loss of data in the case of an accidental browser refresh. Once the days punches have been logged the user is brought to a page listing all historical logs in CSV format for easy copy/pasting.
