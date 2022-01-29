from os import path, system, getcwd, chdir
from threading import Thread
import shutil


def server():
    system("yarn start")


print("Deleting Old Files")
dirpath = path.join("server", ".next")
if path.exists(dirpath) and path.isdir(dirpath):
    shutil.rmtree(dirpath)

dirpath = path.join("server", ".node_modules")
if path.exists(dirpath) and path.isdir(dirpath):
    shutil.rmtree(dirpath)

dirpath = path.join("APP-linux-x64")
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
serverThread = Thread(target=server)
serverThread.daemon = True
serverThread.start()


print("Generanting new executables")
system("yarn nativefier http://localhost:3000")
dirpath = path.join("APP-linux-x64")
if path.exists(dirpath) and path.isdir(dirpath):
    shutil.move("APP-linux-x64", oldPath)
