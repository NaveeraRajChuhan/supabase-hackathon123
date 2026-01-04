// Toggle the Profile Modal visibility
function toggleProfileModal() {
    const overlay = document.getElementById('profileOverlay');
    const isVisible = overlay.style.display === 'flex';
    overlay.style.display = isVisible ? 'none' : 'flex';
}

// Close if clicking outside the card
function closeOverlay(e) {
    if (e.target.id === 'profileOverlay') toggleProfileModal();
}

// Save name and update navbar
function saveName() {
    const newName = document.getElementById('editNameField').value;
    if (newName.trim()) {
        document.getElementById('navUserName').innerText = newName;
        toggleProfileModal();
        Swal.fire({ icon: 'success', title: 'Name Updated', showConfirmButton: false, timer: 1000 });
    }
}

// Handle image selection
document.getElementById('fileInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            document.getElementById('mainAvatar').src = event.target.result;
            document.getElementById('navAvatar').src = event.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// Reset image
function deleteProfile() {
    const placeholder = "https://via.placeholder.com/120";
    document.getElementById('mainAvatar').src = placeholder;
    document.getElementById('navAvatar').src = "https://via.placeholder.com/40";
    Swal.fire('Deleted', 'Profile picture reset.', 'info');
}