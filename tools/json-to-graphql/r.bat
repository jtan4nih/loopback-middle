:set NODE_PATH=.&& set PORT=4000&& set usershost=http://localhost&& set inmemory=&&node --inspect --debug graphi.js

set NODE_PATH=.&& set PORT=4000&& set usershost=http://localhost&& set inmemory=&&node ..\..\node_modules\nodemon\bin\nodemon.js graphi.js

REM The startup is slow due to babel-node, so please be patient ... :(
:set NODE_PATH=.&& set PORT=4000&& set usershost=http://localhost&& set inmemory=&&..\node_modules\.bin\babel-node --presets es2015 graphi.js