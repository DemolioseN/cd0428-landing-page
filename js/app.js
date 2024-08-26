/**
 * Define Global Variables
 * 
*/
const pageSections = document.querySelectorAll('section');
const navigationList = document.getElementById('nav-list');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

/**
 * Returns true if an element is within the visible area of the viewport
 * @param {Element} element
 * @returns {Boolean}
 */
function isElementVisible(element) {
  const boundingRect = element.getBoundingClientRect();
  const thresholdValue = 200; // adjust this value to determine when a section is "near the top"
  return (
    boundingRect.top <= globalThis.innerHeight - thresholdValue &&
    boundingRect.left >= 0 &&
    boundingRect.bottom >= thresholdValue &&
    boundingRect.right <= (globalThis.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

/**
 * Constructs the navigation menu
 */
function constructNavigation() {
  pageSections.forEach((section) => {
    const navigationItem = document.createElement('li');
    const navigationLink = document.createElement('a');
    navigationLink.textContent = section.getAttribute('data-nav');
    navigationLink.href = `#${section.id}`;
    navigationItem.appendChild(navigationLink);
    navigationList.appendChild(navigationItem);
  });
}

/**
 * Adds the 'active' class to a section when it's near the top of the viewport
 */
function highlightActiveSection() {
  pageSections.forEach((section) => {
    section.classList.remove('active'); // remove active class from all sections
  });
  pageSections.forEach((section) => {
    if (isElementVisible(section)) {
      section.classList.add('active');
    }
  });
}

/**
 * Scrolls to an anchor ID using the scrollIntoView method
 * @param {Event} event
 */
function navigateToAnchor(event) {
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
 * Constructs the navigation menu on page load
 */
constructNavigation();

/**
 * Listens for clicks on navigation links and scrolls to the corresponding section
 */
navigationList.addEventListener('click', (event) => {
  if (event.target.tagName === 'A' || event.target.closest('a')) { // use event delegation
    navigateToAnchor(event);
  }
});

/**
 * Listens for scroll events and updates the active section
 */
let throttleTimer;
globalThis.addEventListener('scroll', () => {
  if (!throttleTimer) {
    throttleTimer = setTimeout(() => {
      highlightActiveSection();
      throttleTimer = null;
    }, 200); // adjust this value to control the throttle frequency
  }
});