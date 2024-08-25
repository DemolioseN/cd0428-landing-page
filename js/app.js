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
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
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
    if (isInViewport(section)) {
      section.classList.add('active');
    } else {
      section.classList.remove('active');
    }
  });
}

/**
 * Scrolls to an anchor ID using the scrollIntoView method
 * @param {Event} event
 */
function scrollToAnchor(event) {
  event.preventDefault();
  const anchorId = event.target.getAttribute('href').substring(1);
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
  if (event.target.tagName === 'A') {
    scrollToAnchor(event);
  }
});

/**
 * Listens for scroll events and updates the active section
 */
window.addEventListener('scroll', setActiveSection);