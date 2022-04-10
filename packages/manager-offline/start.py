from os import path, system, getcwd, chdir
import subprocess
import sys

rootPath = getcwd()
serverPath = path.join(getcwd(), "node_modules", "@opensom", "manager")

print("Starting server")
chdir(serverPath)
server = subprocess.Popen(["pnpm", "start"])

print("Starting Program")
system((path.join(rootPath, "OpenSOM-linux-x64", "OpenSOM")))

print("Closing Server")
server.terminate()
sys.exit()
