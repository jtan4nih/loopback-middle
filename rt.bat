@echo off
echo "*********************************************************************************"
echo "Make sure the APIHOSTs are up and running!" c.f. ionic-mobile/tests/ms and rl
echo "You should hit Ctrl + C to quit if it is not and start the tests again."
echo "NOTES: The tests against the real APIHOST is currently broken, thus please wait
echo "until you see '15 tests, 12 assertions, 2 failures, 0 skipped' before ending the test!
echo "*********************************************************************************"
pause
@echo on
:nodist use stable
set quit=truefalse&& set APIHOST=http://127.0.0.1:3064&& npm test && set quit=false&& set APIHOST=&& npm test
