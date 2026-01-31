// --- Shared Logic: Date Display ---
function updateDateTime() {
  const display = document.getElementById('dateDisplay');
  if (display) {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    display.textContent = now.toLocaleDateString('en-US', options);
  }
}
setInterval(updateDateTime, 1000);
updateDateTime();

// --- Profile Page Logic ---

// Default Data (First time load)
const defaultProfile = {
  name: "Abdulahad Warraich",
  role: "Professional Web Developer",
  roll: "FA23-BCS-046",
  dept: "Computer Science",
  sem: "5th",
  email: "abdulahad.web9@gmail.com",
  phone: "+92 3000479696"
};

// 1. Load Data on Startup
document.addEventListener('DOMContentLoaded', () => {
  // Check if we are on the Profile page by looking for a specific element
  if (document.getElementById('display-name')) {
    console.log("Profile Page Detected. Loading data...");
    loadProfile();
  }
});

function loadProfile() {
  // Try to get data from LocalStorage
  const savedData = localStorage.getItem('cui_student_profile');
  const data = savedData ? JSON.parse(savedData) : defaultProfile;

  // Update the UI
  if (document.getElementById('display-header-name')) document.getElementById('display-header-name').textContent = data.name;
  if (document.getElementById('display-header-role')) document.getElementById('display-header-role').textContent = data.role;

  if (document.getElementById('display-name')) document.getElementById('display-name').textContent = data.name;
  if (document.getElementById('display-roll')) document.getElementById('display-roll').textContent = data.roll;
  if (document.getElementById('display-dept')) document.getElementById('display-dept').textContent = data.dept;
  if (document.getElementById('display-sem')) document.getElementById('display-sem').textContent = data.sem;
  if (document.getElementById('display-email')) document.getElementById('display-email').textContent = data.email;
  if (document.getElementById('display-phone')) document.getElementById('display-phone').textContent = data.phone;
}

// 2. Open Modal & Pre-fill Inputs (Global Scope)
window.openEditModal = function () {
  console.log("Opening Edit Modal...");
  const modal = document.getElementById('editModal');

  // Get current displayed values
  document.getElementById('input-name').value = document.getElementById('display-name').textContent.trim();
  document.getElementById('input-role').value = document.getElementById('display-header-role').textContent.trim();
  document.getElementById('input-roll').value = document.getElementById('display-roll').textContent.trim();
  document.getElementById('input-dept').value = document.getElementById('display-dept').textContent.trim();
  document.getElementById('input-sem').value = document.getElementById('display-sem').textContent.trim();
  document.getElementById('input-email').value = document.getElementById('display-email').textContent.trim();
  document.getElementById('input-phone').value = document.getElementById('display-phone').textContent.trim();

  // Show modal
  modal.classList.add('active');
};

// 3. Close Modal (Global Scope)
window.closeEditModal = function () {
  document.getElementById('editModal').classList.remove('active');
};

// Close modal if clicking outside the box
window.onclick = function (event) {
  const modal = document.getElementById('editModal');
  if (event.target == modal) {
    window.closeEditModal();
  }
};

// 4. Save Changes (Global Scope)
window.saveProfile = function (event) {
  event.preventDefault(); // Stop form submit reload
  console.log("Saving new profile data...");

  // Gather new data
  const updatedProfile = {
    name: document.getElementById('input-name').value,
    role: document.getElementById('input-role').value,
    roll: document.getElementById('input-roll').value,
    dept: document.getElementById('input-dept').value,
    sem: document.getElementById('input-sem').value,
    email: document.getElementById('input-email').value,
    phone: document.getElementById('input-phone').value
  };

  // Save to LocalStorage
  localStorage.setItem('cui_student_profile', JSON.stringify(updatedProfile));

  // Refresh UI
  loadProfile();

  // Close Modal & Alert
  window.closeEditModal();
  alert("Profile Updated Successfully!");
};

