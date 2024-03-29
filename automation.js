const readline = require("readline");
const { exec } = require("child_process");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function promptForInput(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      resolve(answer);
    });
  });
}

async function createAutomation() {
  const name = await promptForInput("Enter automation name: ");
  const portalSubdomain = await promptForInput("Enter portal subdomain: ");
  const dstFolder = await promptForInput("Enter destination folder: ");
  const createPackageFolder = await promptForInput(
    "Create package folder (true/false): "
  );
  const effectiveTime = await promptForInput(
      "Enter effective time (e.g., 2010-12-12T23:59:59-05:00): "
  );
  const enabled = await promptForInput("Enabled (true/false which indicates whether the automation will be enabled immediately or not): ");
  const downloadPriority = await promptForInput("Enter download priority: ");

  const curlCommand = `curl -X POST -H "Content-Type: application/json" http://localhost:8888/api/v1/automations/portal_download -d '{
    "name": "${name}",
    "portal_subdomain": "${portalSubdomain}",
    "dst_folder": "${dstFolder}",
    "create_package_folder": ${createPackageFolder},
    "effective_time": "${effectiveTime}",
    "enabled": ${enabled},
    "download_priority": ${downloadPriority}
  }'`;

  exec(curlCommand, (error, stdout, stderr) => {
    if (error) {
      console.error("Error executing command:", error);
    } else {
      console.log("Command executed successfully");
      console.log("Output:", stdout);
    }
  });
  rl.close();
}

createAutomation();
