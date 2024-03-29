const { exec } = require('child_process');

const transferAgentCommand = 'curl http://localhost:8888/api/v1/version_check';

function getVersion(callback) {
  exec(transferAgentCommand, (error, stdout, stderr) => {
    if (error) {
      console.error('Error fetching version:', error.message);
      callback(null);
      return;
    }
    const version = stdout.trim();
    callback(version);
 });
}

function main() {
  getVersion(version => {
    if (version !== null) {
      console.log('Transfer Agent version:', version);
    } else {
      console.log('Failed to retrieve Transfer Agent version.');
    }
  });
}
