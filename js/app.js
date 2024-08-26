/**
 * Define Global Variables
 * 
*/
const sections = document.querySelectorAll('section');
const navList = document.getElementById('nav-list');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

/**
 * Returns true if an element is in the viewport
 * @param {Element} elem
 * @returns {Boolean}
 */
function isInViewport(elem) {
  const rect = elem.getBoundingClientRect();
  const threshold = 200; // adjust this value to determine when a section is "near the top"
  return (
    rect.top <= window.innerHeight - threshold &&
    rect.left >= 0 &&
    rect.bottom >= threshold &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

/**
 * Builds the navigation menu
 */
function buildNav() {
  sections.forEach((section) => {
    const navItem = document.createElement('li');
    const navLink = document.createElement('a');
    navLink.textContent = section.getAttribute('data-nav');
    navLink.href = `#${section.id}`;
    navItem.appendChild(navLink);
    navList.appendChild(navItem);
  });
}

/**
 * Adds the 'active' class to a section when it's near the top of the viewport
 */
function setActiveSection() {
  sections.forEach((section) => {
    section.classList.remove('active'); // remove active class from all sections
  });
  sections.forEach((section) => {
    if (isInViewport(section)) {
      section.classList.add('active');
    }
  });
}

/**
 * Scrolls to an anchor ID using the scrollIntoView method
 * @param {Event} event
 */
function scrollToAnchor(event) {
  event.preventDefault();
  const anchorId = event.target.getAttribute('href').replace(/^#/, ''); // use regex to remove leading #
  const anchorElement = document.getElementById(anchorId);
  anchorElement.scrollIntoView({ behavior: 'smooth' });
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

/**
 * Builds the navigation menu on page load
 */
buildNav();

/**
 * Listens for clicks on navigation links and scrolls to the corresponding section
 */
navList.addEventListener('click', (event) => {
  if (event.target.tagName === 'A' || event.target.closest('a')) { // use event delegation
    scrollToAnchor(event);
  }
});

/**
 * Listens for scroll events and updates the active section
 */
let throttleTimeout;
window.addEventListener('scroll', () => {
  if (!throttleTimeout) {
    throttleTimeout = setTimeout(() => {
      setActiveSection();
      throttleTimeout = null;
    }, 200); // adjust this value to control the throttle frequency
  }
});