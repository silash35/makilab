import { execSync } from "child_process";
import concurrently from "concurrently";
import fs from "fs";

console.log("Deleting Old Files");
try {
  fs.rmSync("node_modules", { recursive: true });
  fs.rmSync("OpenSOM-linux-x64", { recursive: true });
} catch (error) {
  // do nothing, it's fine if the folders don't exist
}

console.log("Downloading and installing new files");
execSync("git pull");
execSync("pnpm install");

console.log("Building new server files");
execSync("pnpm build", {
  cwd: "./node_modules/@opensom/backend/",
});
execSync("pnpm build", {
  cwd: "./node_modules/@opensom/frontend/",
});

console.log("Starting server");
const { commands, result } = concurrently(
  [
    { command: "pnpm start", name: "backend", cwd: "./node_modules/@opensom/backend/" },
    { command: "pnpm start", name: "frontend", cwd: "./node_modules/@opensom/frontend/" },
  ],
  { killOthers: ["success", "failure"] }
);

result.catch(() => {
  // do nothing
});

if (!fs.existsSync("./logs")) {
  console.log("Creating log directory");
  fs.mkdirSync("./logs");
}

console.log("Generating new executables");
execSync("pnpm nativefier --name OpenSOM --portable http://127.0.0.1:3000 ./");

console.log("closing servers");
commands.forEach((command) => {
  command.kill("SIGTERM");
});
