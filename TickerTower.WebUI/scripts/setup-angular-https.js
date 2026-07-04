const fs = require("fs");
const path = require("path");
const os = require("os");
const { spawnSync } = require("child_process");

const certDir = path.join(os.homedir(), ".aspnet", "https");
const certPath = path.join(certDir, "ticker-tower.client.pem");
const keyPath = path.join(certDir, "ticker-tower.client.key");

function run(command, args) {
  const result = spawnSync(command, args, {
    stdio: "inherit"
  });

  if (result.status !== 0) {
    throw new Error(`Command failed: ${command} ${args.join(" ")}`);
  }
}

if (!fs.existsSync(certDir)) {
  fs.mkdirSync(certDir, { recursive: true });
}

if (fs.existsSync(certPath) && fs.existsSync(keyPath)) {
  console.log("Angular HTTPS cert already exists:");
  console.log(`  Cert: ${certPath}`);
  console.log(`  Key:  ${keyPath}`);
  process.exit(0);
}

console.log("Creating and trusting local HTTPS dev certificate...");
run("dotnet", ["dev-certs", "https", "--trust"]);

console.log("Exporting cert/key for Angular...");
run("dotnet", [
  "dev-certs",
  "https",
  "--export-path",
  certPath,
  "--format",
  "PEM",
  "--no-password"
]);

console.log("Done.");
console.log(`Cert: ${certPath}`);
console.log(`Key:  ${keyPath}`);