import { execSync } from "child_process";
import concurrently from "concurrently";

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

console.log("Starting Program");
execSync("OpenSOM-linux-x64/OpenSOM");

console.log("closing servers");
commands.forEach((command) => {
  command.kill("SIGTERM");
});
