/**
 * GitHub Profile Interface Client Script
 * Zero external libraries, robust vanilla ES6+
 */

document.addEventListener('DOMContentLoaded', () => {
  initDynamicYear();
  initContributionGrid();
  initEmailCopy();
  initProfileCopy();
  initTabNavigation();
});

/**
 * Updates dynamic year in the footer
 */
function initDynamicYear() {
  const yearElement = document.getElementById('footerYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

/**
 * Generates an authentic GitHub-style contribution calendar matrix
 */
function initContributionGrid() {
  const container = document.getElementById('contribCalendar');
  if (!container) return;

  const totalColumns = 42;
  const rows = 7;
  const totalCells = totalColumns * rows;

  // Pseudo-random deterministic distribution mirroring real engineering commit patterns
  const distribution = [0, 0, 1, 1, 2, 0, 3, 1, 2, 4, 1, 0, 2, 3, 1, 0, 0, 2, 1, 3, 2, 4];
  
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < totalCells; i++) {
    const cell = document.createElement('div');
    const level = distribution[(i * 7 + (i % 13)) % distribution.length];
    cell.className = `gh-cell lvl-${level}`;
    cell.setAttribute('title', `${level * 3} kontribusi`);
    fragment.appendChild(cell);
  }

  container.appendChild(fragment);
}

/**
 * Email copy button handling with clipboard API & fallback
 */
function initEmailCopy() {
  const copyBtn = document.getElementById('copyEmailBtn');
  const emailTextEl = document.getElementById('targetEmail');
  const statusEl = document.getElementById('copyStatusText');

  if (!copyBtn || !emailTextEl || !statusEl) return;

  let timer = null;

  copyBtn.addEventListener('click', async () => {
    const email = emailTextEl.textContent.trim();

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(email);
      } else {
        const input = document.createElement('input');
        input.value = email;
        input.style.position = 'fixed';
        input.style.opacity = '0';
        document.body.appendChild(input);
        input.focus();
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
      }

      statusEl.textContent = 'Alamat surel berhasil disalin ke papan klip.';
      copyBtn.textContent = 'Tersalin!';

      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        statusEl.textContent = '';
        copyBtn.textContent = 'Salin Alamat Surel';
      }, 3000);
    } catch {
      statusEl.textContent = 'Gagal menyalin otomatis. Silakan salin manual.';
    }
  });
}

/**
 * Quick profile summary copy
 */
function initProfileCopy() {
  const profileBtn = document.getElementById('copyProfileBtn');
  if (!profileBtn) return;

  let timer = null;

  profileBtn.addEventListener('click', async () => {
    const summary = 'Ahmad Rabbani (@rabbani) - Full-Stack & Systems Engineer | rabbani@example.com | https://github.com';

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(summary);
      }
      profileBtn.textContent = 'Profil Tersalin!';

      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        profileBtn.textContent = 'Salin Informasi Profil';
      }, 2500);
    } catch {
      profileBtn.textContent = 'Gagal Menyalin';
    }
  });
}

/**
 * Tab active state sync with section clicks
 */
function initTabNavigation() {
  const tabs = document.querySelectorAll('.gh-tab-item');
  if (!tabs.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });
}
