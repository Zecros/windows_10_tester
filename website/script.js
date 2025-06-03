document.addEventListener('DOMContentLoaded', () => {
  const emailForm = document.getElementById('emailForm');
  const infoBtn = document.getElementById('infoBtn');
  const modalOverlay = document.getElementById('modalOverlay');
  const infoModal = document.getElementById('infoModal');
  const closeModal = document.getElementById('closeModal');

  // Öppna modalen
  infoBtn.addEventListener('click', () => {
    modalOverlay.classList.remove('hidden');
    infoModal.classList.remove('hidden');
  });

  // Stäng modalen (knapp eller klick utanför rutan)
  function hideModal() {
    modalOverlay.classList.add('hidden');
    infoModal.classList.add('hidden');
  }
  closeModal.addEventListener('click', hideModal);
  modalOverlay.addEventListener('click', hideModal);

  // Hantera formuläret
  emailForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    if (!email) return;
    
    // Spara e-postadressen i localStorage
    localStorage.setItem('windows11_checker_email', email);

    try {
      // Skicka e-postadress till backend (kan ersättas senare)
      await fetch('https://example.com/api/register-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
    } catch (err) {
      console.warn('Kunde inte skicka e-post till backend, fortsätter ändå...', err);
    }

    // Ladda ned programmet
    window.location.href = 'downloads/checker.exe';
  });
});
