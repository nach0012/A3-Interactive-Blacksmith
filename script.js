// PLAN
// Add heat: stop the page reloading, read the box, turn it into a number.
//   If it's empty, 0, negative, a decimal or not a number, show an error and stop.
//   If it's fine, call heatForge() and empty the box.
// Make sword: call makeSword(). It already shows the message.
// Reset: call resetForge(). It sets heat 20, swords 0, and clears the box and message.

// Select the page elements
const forgeBox = document.querySelector('#forge');
const forgeImage = document.querySelector('#forge-image');
const statusText = document.querySelector('#forge-status');
const heatText = document.querySelector('#heat-value');
const swordText = document.querySelector('#sword-count');
const messageText = document.querySelector('#action-message');

// Select the controls
const heatForm = document.querySelector('#heat-form');
const heatInput = document.querySelector('#heat-input');
const makeSwordButton = document.querySelector('#make-sword-button');
const resetButton = document.querySelector('#reset-button');

// State variables
let forgeHeat = 20;
let swordsMade = 0;

//  the status that matches a heat value
function getForgeStatus(heatValue) {
  if (heatValue < 30) {
    return 'Too cold';
  } else if (heatValue < 70) {
    return 'Ready to forge';
  } else {
    return 'Roaring fire';
  }
}

// Update the current state on the page
function updateForge() {
  heatText.textContent = forgeHeat;
  swordText.textContent = swordsMade;

  const status = getForgeStatus(forgeHeat);
  statusText.textContent = status;

  forgeBox.classList.remove('is-cold', 'is-ready', 'is-roaring');

  if (status === 'Too cold') {
    forgeBox.classList.add('is-cold');
    forgeImage.src = 'assets/forge-cold.svg';
    forgeImage.alt = 'A stone forge with dark coals and no flames';
  } else if (status === 'Ready to forge') {
    forgeBox.classList.add('is-ready');
    forgeImage.src = 'assets/forge-ready.svg';
    forgeImage.alt = 'A stone forge with a small orange fire';
  } else {
    forgeBox.classList.add('is-roaring');
    forgeImage.src = 'assets/forge-roaring.svg';
    forgeImage.alt = 'A stone forge with tall bright flames and sparks';
  }
}

// Add heat to the forge, up to 100
function heatForge(amount) {
  forgeHeat = forgeHeat + amount;

  if (forgeHeat > 100) {
    forgeHeat = 100;
  }

  messageText.textContent = 'You heated the forge.';
  updateForge();
}

// Make one sword if there is enough heat
function makeSword() {
  if (forgeHeat >= 30) {
    forgeHeat = forgeHeat - 30;
    swordsMade = swordsMade + 1;
    messageText.textContent = 'Success! You made a sword.';
  } else {
    messageText.textContent = 'The forge needs at least 30 heat to make a sword.';
  }

  updateForge();
}

// Return the forge to its starting state
function resetForge() {
  forgeHeat = 20;
  swordsMade = 0;
  heatInput.value = '';
  messageText.textContent = '';
  updateForge();
}

// ----- Event handlers -----

// Add heat: read the input, check it, then call heatForge()
function handleAddHeat(event) {
  // Stop the form from reloading the page
  event.preventDefault();

  // Read the text and convert it to a number
  const inputText = heatInput.value.trim();
  const amount = Number(inputText);

  // Check the input. If it is not valid, show a message and stop.
  if (heatInput.validity.badInput) {
    // The browser could not read the text as a number (for example "abc" or "-")
    messageText.textContent = 'Please enter a number for the heat.';
  } else if (inputText === '') {
    messageText.textContent = 'Please enter an amount of heat to add.';
  } else if (!Number.isFinite(amount)) {
    messageText.textContent = 'Please enter a number for the heat.';
  } else if (!Number.isInteger(amount)) {
    messageText.textContent = 'Heat must be a whole number, like 10 (no decimals).';
  } else if (amount <= 0) {
    messageText.textContent = 'Heat must be greater than 0.';
  } else {
    // Valid input: reuse the game function, then clear the box
    heatForge(amount);
    heatInput.value = '';
  }
}

// Make sword: reuse the game function
function handleMakeSword() {
  makeSword();
}

// Reset forge: reuse the game function
function handleReset() {
  resetForge();
}

// ----- Connect the controls -----
heatForm.addEventListener('submit', handleAddHeat);
makeSwordButton.addEventListener('click', handleMakeSword);
resetButton.addEventListener('click', handleReset);

// Start the game
resetForge();