@echo off
echo "*********************************************************************************"
echo "Make sure the APIHOSTs are up and running!" c.f. ionic-mobile/tests/ms and rl
echo "You should hit Ctrl + C to quit if it is not and start the tests again."
echo "*********************************************************************************"
pause
@echo on
:nodist use stable
rem first test the mock APIHOST, then the real APIHOST
set quit=truefalse&& set APIHOST=http://127.0.0.1:3064&& npm test && set quit=false&& set APIHOST=&& npm test

:set quit=false&& set APIHOST=&& npm test