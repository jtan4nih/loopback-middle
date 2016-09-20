echo "THIS IS ASSUMING THAT lb-ng IS ALREADY INSTALLED GLOBALLY (i.e. ig.bat is ran)!"
echo "==============================================================================="
echo "copy /Y client\js\services\lb-services.js ..\stem2-mobile\www\client\js\services"

mkdir -p client\js\services

lb-ng server/server.js client/js/services/lb-services.js && copy /Y client\js\services\lb-services.js ..\stem2-mobile\www\client\js\services

echo "Please copy over the file manually to mobile project's client! e.g."
echo "copy /Y client\js\services\lb-services.js ..\stem2-mobile\www\client\js\services"