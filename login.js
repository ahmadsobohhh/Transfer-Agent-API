const axios = require('axios');
const readline = require('readline');

const loginUrl = 'http://localhost:8888/api/v1/login';
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function promptForInput(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      resolve(answer);
    });
  });
}

async function login() {
  const email = await promptForInput('Enter your email: ');
  const password = await promptForInput('Enter your password: ');

  const loginData = {
    email,
    password
  };

  try {
    const response = await axios.post(loginUrl, loginData, {
      headers: {
        'Content-Type': 'application/json'
      }
 });

    console.log('Login response:', response.data);
  } catch (error) {
    console.error('Error logging in:', error.message);
  } finally {
    rl.close();
  }
}

login();
