from os import path, system, getcwd, chdir
import subprocess
import shutil
import sys

rootPath = getcwd()
serverPath = path.join(getcwd(), "node_modules", "@opensom", "manager")

print("Deleting Old Files")
dirpath = path.join("OpenSOM-linux-x64")
if path.exists(dirpath) and path.isdir(dirpath):
    shutil.rmtree(dirpath)

dirpath = path.join(serverPath, "node_modules")
if path.exists(dirpath) and path.isdir(dirpath):
    shutil.rmtree(dirpath)

dirpath = path.join(rootPath, "node_modules")
if path.exists(dirpath) and path.isdir(dirpath):
    shutil.rmtree(dirpath)


print("Downloading and installing new files")
system("git pull")
system("pnpm install")
chdir(serverPath)
system("pnpm install")

print("Building new server files")
chdir(serverPath)
system("pnpm build")


print("Starting server")
server = subprocess.Popen(["pnpm", "start"])


print("Generanting new executables")
chdir(rootPath)
system("pnpm nativefier --name OpenSOM --portable http://127.0.0.1:3000 " + rootPath)


print("Closing Server")
server.terminate()
sys.exit()
