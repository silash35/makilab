from os import path, system, getcwd, chdir
import subprocess
import shutil
import time
import sys


print("Deleting Old Files")
dirpath = path.join("server", ".next")
if path.exists(dirpath) and path.isdir(dirpath):
    shutil.rmtree(dirpath)

dirpath = path.join("server", ".node_modules")
if path.exists(dirpath) and path.isdir(dirpath):
    shutil.rmtree(dirpath)

dirpath = path.join("Makilab-linux-x64")
if path.exists(dirpath) and path.isdir(dirpath):
    shutil.rmtree(dirpath)


print("Downloading and installing new files")
system("git pull")
oldPath = getcwd()
chdir(path.join("server"))
system("yarn install")


print("Building new server files")
system("yarn build")


print("Starting server")
server = subprocess.Popen(["yarn", "start"])


print("Generanting new executables")
system("yarn nativefier --name Makilab --portable http://127.0.0.1:3000 " + oldPath)


print("Closing Server")
server.terminate()
sys.exit()
