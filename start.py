from os import path, system, getcwd, chdir
import subprocess
import sys


print("Starting server")
oldPath = getcwd()
chdir(path.join("server"))
server = subprocess.Popen(["yarn", "start"])

print("Starting Program")
system((path.join(oldPath, "Makilab-linux-x64", "Makilab")))

print("Closing Server")
server.terminate()
sys.exit()
