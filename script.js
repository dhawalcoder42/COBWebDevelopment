const sidebar = document.querySelector('.sidebar');

sidebar.addEventListener('mouseenter', () => {
  sidebar.style.width = '250px';
});

sidebar.addEventListener('mouseleave', () => {
  sidebar.style.width = '0';
});


const account = document.querySelector('.account');
const accountDropdown = document.querySelector('.account-dropdown');

account.addEventListener('click', () => {
  accountDropdown.classList.toggle('show');
});

window.addEventListener('click', (event) => {
  if (!event.target.matches('.account')) {
    const dropdowns = document.getElementsByClassName('account-dropdown');
    for (let i = 0; i < dropdowns.length; i++) {
      const openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
});