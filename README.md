# Shinobi
use $rootScope to store the state of app
component only emit the event to $rootScope and get value
only appCtrl set data of $rootScope

app.config : store state of $rootScope in run function and share constant in app
app.controller: get the event and handle the change of $rootScope