pause "----> PLEASE RUN THIS IN A NON-POWERSHELL WINDOW e.g. "Run as administrator"!!! Hit any key if you have, otherwise hit Ctrl + C to break..."

REM for Windows, install the prerequisites first c.f. http://loopback.io/doc/en/lb2/Installing-compiler-tools.html#windows

:nodist use stable && npm install -g apiconnect && npm install -g jasmine-node-debug
:choco install dotnet3.5 && cinst VisualStudio2013Professional && nodist use 6.6.0 && npm install -g strongloop && npm install -g jasmine-node-debug

npm install -g apiconnect