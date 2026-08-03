const $navMenu = document.getElementById('menu');
const $menuToggle = document.querySelector('.menu-toggle');

const desktopMediaQuery = window.matchMedia('(min-width: 70rem)');

/**
 * Synchronizes the navigation mode with the current viewport.
 *
 * Enables inert in the mobile layout and removes it in the desktop layout.
 */
function syncMenuMode() {
  $navMenu.toggleAttribute('inert', !desktopMediaQuery.matches);
}

syncMenuMode();


/**
 * Returns whether the navigation menu is currently expanded.
 *
 * @returns {boolean}
 */
function isMenuExpanded() {
  return $menuToggle.ariaExpanded === 'true';
}

/**
 * Synchronizes the navigation menu state with the UI and ARIA attributes.
 *
 * @param {boolean} isExpanded - Whether the menu should be expanded.
 */
function setMenuState(isExpanded) {
  $menuToggle.ariaExpanded = isExpanded;
  $menuToggle.ariaLabel = isExpanded ? 'Close menu' : 'Open menu';

  $menuToggle.classList.toggle('is-expanded', isExpanded)

  $navMenu.toggleAttribute('inert', !isExpanded);
  $navMenu.classList.toggle('is-expanded', isExpanded);

  if (!isExpanded) {
    $menuToggle.focus();
  }
}

/**
 * Toggles the navigation menu between expanded and collapsed states.
 */
function toggleMenu() {
  setMenuState(!isMenuExpanded());
}


$menuToggle.addEventListener('click', toggleMenu);


// Close the menu when the Escape key is pressed.
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && isMenuExpanded()) {
    setMenuState(false);
  }
});


// Close the menu when clicking outside the navigation and toggle button.
document.addEventListener('click', (e) => {
  const isClickInsideMenu = $navMenu.contains(e.target);
  const isClickOnToggle = $menuToggle.contains(e.target);

  if (isMenuExpanded() && !isClickInsideMenu && !isClickOnToggle) {
    setMenuState(false);
  }
});





// Ensure the mobile menu is closed when switching to the desktop layout.
// desktopMediaQuery.addEventListener('change', (e) => {
//   $navMenu.inert = false;
// });



// if (e.matches && isMenuExpanded()) {
//   setMenuState(false);
// }