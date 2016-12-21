pause "----> PLEASE RUN THIS IN A NON-POWERSHELL WINDOW e.g. "Run as administrator"!!! Hit any key if you have, otherwise hit Ctrl + C to break..."

REM for Windows, install the prerequisites first c.f. http://loopback.io/doc/en/lb2/Installing-compiler-tools.html#windows
REM python --version Should be 2.7.x
REM node --version Should be v0.10.x or v0.12.x.
REM npm --version Should be 1.x or 2.x.
:nodist use stable && npm install -g apiconnect && npm install -g jasmine-node-debug
:choco install dotnet3.5 && cinst VisualStudio2013Professional && nodist use 0.12 && npm install -g strongloop && npm install -g jasmine-node-debug

REM the versions has to be correct!!!
python --version && echo "has to be 2.7!"
node --version && echo "Should be v0.10.x or v0.12.x"
npm --version && echo "Should be 1.x or 2.x"

pause "Are the prerequisites correct? Hit Ctrl + C to break if not!"
npm install -g apiconnect
:npm install -g strongloop