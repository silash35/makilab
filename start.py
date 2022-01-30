from os import path, system, getcwd, chdir
import subprocess
import sys


print("Starting server")
oldPath = getcwd()
chdir(path.join("server"))
server = subprocess.Popen(["yarn", "start"])

print("Starting Program")
system((path.join(oldPath, "APP-linux-x64", "APP")))

print("Closing Server")
server.terminate()
sys.exit()
