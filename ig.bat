pause "----> PLEASE RUN THIS IN A NON-POWERSHELL WINDOW e.g. "Run as administrator"!!! Hit any key if you have, otherwise hit Ctrl + C to break..."

:nodist use stable && npm install -g apiconnect && npm install -g jasmine-node-debug
choco install dotnet3.5 && cinst VisualStudio2012Professional && nodist use 6.6.0 && npm install -g strongloop && npm install -g jasmine-node-debug
