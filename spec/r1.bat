echo ""
echo "Have you shut down the real API services locally?"
echo ""

:set quit=false
set quit=
node ..\node_modules\jasmine-node\bin\jasmine-node %1 --captureExceptions