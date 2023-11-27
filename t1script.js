document.getElementById('generateBtn').addEventListener('click', generatePassword);

function generatePassword() {
  const length = document.getElementById('length').value;
  const uppercase = document.getElementById('uppercase').checked;
  const lowercase = document.getElementById('lowercase').checked;
  const numbers = document.getElementById('numbers').checked;
  const symbols = document.getElementById('symbols').checked;

  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const numberChars = '0123456789';
  const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

  let availableChars = '';
  let generatedPassword = '';

  if (uppercase) availableChars += uppercaseChars;
  if (lowercase) availableChars += lowercaseChars;
  if (numbers) availableChars += numberChars;
  if (symbols) availableChars += symbolChars;

  if (availableChars.length === 0) {
    alert('Please select at least one character type.');
    return;
  }

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * availableChars.length);
    generatedPassword += availableChars[randomIndex];
  }

  document.getElementById('passwordDisplay').textContent = generatedPassword;
  checkPasswordStrength(generatedPassword);
}

function checkPasswordStrength(password) {
  const passwordStrength = document.getElementById('passwordStrength');
  let strengthText = '';

  if (password.length < 6) {
    strengthText = 'Weak';
    passwordStrength.className = 'weak';
  } else if (password.length < 10) {
    strengthText = 'Moderate';
    passwordStrength.className = 'strong';
  } else {
    strengthText = 'Strong';
    passwordStrength.className = 'strong';
  }

  if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
    strengthText += ' with Symbols';
    passwordStrength.className += ' symbols';
  }

  passwordStrength.textContent = `Password Strength: ${strengthText}`;
}