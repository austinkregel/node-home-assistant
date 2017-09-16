# How to use.
To use it
   1. clone it
   2. set the variables in the ENV file 
   3. Run the Learn.js file in the root project directory... 
   4. Lastly, ask "Sonus, what's the weather like" or something like that.

## A simple Home assistant built in node.
This was originally built to be a chat bot, but turned into a home assistant. 

```env
APP_DEBUG=true #boolean
MY_ZIPCODE=48867
GOOGLE_APPLICATION_CREDENTIALS="/path/to/creds.json"
GOOGLE_PROJECT_ID=""
TIMEZONE="EST"
TWILIO_ACCOUNT_SID=""
TWILIO_SID=""
TWILIO_TOKEN=""
TWILIO_NUMBER="+15555555555"
CAN_SERVE=false #boolean
CAN_SERVE=false #boolean
DARK_SKY_KEY=""
```
### Side note...
If you try and run this project, there will be at least one error. If this error is about the database.json file just create a json object similar to the one below with your information in the `./data/database.json` file.

```json 
{
  "user": {
    "name": "Austin Kregel",
    "phone": "+15555555555"
  }
}
```


## Links
[Google Cloud Platform](https://cloud.google.com)

[Twilio](https://twilio.com)

[Dark Sky](https://darksky.net)
