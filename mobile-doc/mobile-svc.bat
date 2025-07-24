
@echo off

set myVar=%cd%
set output="%myVar%\appsettings.json"
set "netPath=%myVar%\wwwroot\upload\image"

set "netPath=%netPath:/=//%" 
set "netPath=%netPath:\=\\%" 

echo ******************************************************
echo          Configuration of Mobile Web Service
echo ******************************************************
echo Note* - Some parameters have default value. Please press Enter key, if do not want to change.

set /p dbsrvr=Enter database server machine IP : 

set /p dbname=Enter database name : 

set "uid=sa"
set /p uid="Enter database user id - Default( sa ) : " 
set "upass=qwerty@1"
set /p upass="Enter database password - Default( qwerty@1 ) : " 

set /p hostIp="Enter mobile application host ip and port e.g.(current machineip:port - 127.0.0.1:8040) : "
set /p webappurl="Enter web application url e.g.(machineip:port - 127.0.0.1:8050): "
set /p websocketurl="Enter web socket url e.g.(machineip:port - 127.0.0.1:8005): "
set /p webapiurl="Enter mobile api url used by mobile client(apk) e.g.(current machineip:port - 127.0.0.1:8040): "

echo { > %output%
echo  "ConnectionStrings": {>> %output%
echo    "DefaultConnection": "Server=%dbsrvr%;Database=%dbname%;User Id=%uid%;Password=%upass%;MultipleActiveResultSets=true">> %output%
echo  },>> %output%
echo  "SettingConfig": {>> %output%
echo    "Hostmachine": "http://%hostIp%",>> %output%
echo    "NetworkPath": "%netPath%", >> %output%
echo    "WebAppURL": "http://%webappurl%", >> %output%
echo    "WebsocketURL": "http://%websocketurl%", >> %output%
echo    "WebAPIURL": "http://%webapiurl%" >> %output%
echo  },>> %output%
echo  "Logging": {>> %output%
echo    "LogLevel": {>> %output%
echo      "Default": "Information",>> %output%
echo      "Microsoft": "Warning",>> %output%
echo      "Microsoft.Hosting.Lifetime": "Information">> %output%
echo    }>> %output%
echo  },>> %output%
echo  "AllowedHosts": "*",>> %output%
echo  "AppOpts": {>> %output%
echo    "OprMode": "m3s",>> %output%
echo    "SesTmo": "300",>> %output%
echo    "DbType": "mssql",>> %output%
echo    "LkpMode": "group">> %output%
echo  },>> %output%
echo  "CleanCache": {>> %output%
echo    "MaxImgFiles": "10000",>> %output%
echo    "MaxImgHours": "48",>> %output%
echo    "MaxVidHours": "24">> %output%
echo    } >> %output%
echo  }>> %output%  

sc create mobile-svc binpath= "%myVar%\VmsMobileApi.exe"

echo ******************************************************
echo    Your service is running:  http://%hostIp%
echo ******************************************************
