const button = document.querySelector('[data-js-button-desktop-menu]');
const container = document.querySelector('[data-js-popup-desktop-menu]');
const submenu = document.querySelector('[data-js-popup-desktop-submenu]');

const menuMap = {
  'popup-desktop-menu__item': 'sub1',
  'popup-desktop-menu__item2': 'sub2',
  'popup-desktop-menu__item3': 'sub3',
  'popup-desktop-menu__item4': 'sub4',
  'popup-desktop-menu__item5': 'sub5',
  'popup-desktop-menu__item6': 'sub6',
};

const menuItems = Object.keys(menuMap);
const submenuBlocks = Object.values(menuMap).map(id => document.querySelector('#' +id));

let isOpen = false;
let containerBaseHeight = 0;

button.addEventListener('click', (e) => {
  
  e.stopPropagation();
  isOpen = !isOpen;

  if (isOpen) {
    container.style.display = 'flex';
  } else {
    hideMenu();
  }
  
  containerBaseHeight = container.getBoundingClientRect().height;
});

document.addEventListener('click', (e) => {
  if (!container.contains(e.target) && !button.contains(e.target)) {
    hideMenu();
  }
});

menuItems.forEach(id => {
  const menuItem = document.querySelector('.' + id);
  
  menuItem.addEventListener('mouseenter', () => {
    submenuBlocks.forEach(block => block.classList.remove('active'));
    const subId = menuMap[id];
    const sub = document.getElementById(subId);
    if (sub) sub.classList.add('active');
    submenu.classList.add('visible');
    
    const subHeight = sub.parentElement.getBoundingClientRect().height;
    const containerHeight = container.getBoundingClientRect().height;
    
    if (containerHeight < subHeight) {
      container.style.height = subHeight + 'px';
    } else if (containerBaseHeight < containerHeight) {
      container.style.height = containerBaseHeight + 'px';
    }

    if (subHeight < containerHeight) {
      sub.parentElement.style.minHeight = containerBaseHeight + 'px';
    }
  });
});

function hideMenu() {
  container.style.height = containerBaseHeight + 'px';
  container.style.display = 'none';
  
  submenu.classList.remove('visible');
  submenuBlocks.forEach(block => block.classList.remove('active'));
  isOpen = false;
}