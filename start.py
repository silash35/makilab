from os import path, system, getcwd, chdir
from threading import Thread


def server():
    system("yarn start")


print("Starting server")
oldPath = getcwd()
chdir(path.join("server"))
serverThread = Thread(target=server)
serverThread.daemon = True
serverThread.start()


print("Start Program")
system((path.join(oldPath, "APP-linux-x64", "APP")))
