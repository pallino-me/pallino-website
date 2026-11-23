'use strict';

const T = window.STRINGS;

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const root = document.documentElement;
if (!reducedMotion.matches && 'IntersectionObserver' in window) {
  root.classList.add('js-motion');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
}

const motionButton = document.querySelector('.motion-toggle');
function setMotion(paused) {
  root.classList.toggle('motion-paused', paused);
  motionButton.setAttribute('aria-pressed', String(paused));
  motionButton.setAttribute('aria-label', paused ? T.motion.resume : T.motion.pause);
  motionButton.title = motionButton.getAttribute('aria-label');
  motionButton.textContent = paused ? '▷' : 'Ⅱ';
}
setMotion(reducedMotion.matches);
motionButton.addEventListener('click', () => setMotion(!root.classList.contains('motion-paused')));
reducedMotion.addEventListener('change', event => setMotion(event.matches));

document.querySelector('.demo-task').addEventListener('click', event => {
  const button = event.currentTarget;
  button.setAttribute('aria-pressed', String(button.getAttribute('aria-pressed') !== 'true'));
});

// Space palettes come from strings.js (they mirror Pallino's Colors.kt).
const spaces = T.spaces;

const swatches = [...document.querySelectorAll('.swatch')];
let currentSpace = 'blue';

// Real screenshots exist for each space colour: capture-blue.webp, capture-orange.webp, …
const spaceShotUrl = (name, key) => `assets/screenshots/${name}-${key}.webp`;
function applySpaceShots() {
  document.querySelectorAll('[data-space-shot]').forEach(el => {
    const url = spaceShotUrl(el.dataset.spaceShot, currentSpace);
    el.dataset.image = url;
    const img = el.querySelector('img');
    if (img && !img.src.endsWith(url)) img.src = url;
  });
}

function selectSpace(key) {
  const space = spaces[key];
  if (!space) return;
  currentSpace = key;
  root.style.setProperty('--space', space.main);
  root.style.setProperty('--space-pale', space.container);
  root.style.setProperty('--space-bg', space.bg);
  root.style.setProperty('--space-ink', space.ink);
  swatches.forEach(swatch => {
    const active = swatch.dataset.space === key;
    swatch.classList.toggle('active', active);
    swatch.setAttribute('aria-pressed', String(active));
  });
  document.querySelectorAll('.space-name-label').forEach(el => { el.textContent = space.name; });
  document.querySelectorAll('.space-task-label').forEach(el => { el.textContent = space.task; });
  document.querySelectorAll('.space-proj-label').forEach(el => { el.textContent = space.project; });
  document.querySelectorAll('.space-proj-chip').forEach(el => { el.textContent = space.project; });
  document.querySelectorAll('.space-tag-label').forEach(el => { el.textContent = space.tag; });
  document.querySelectorAll('.space-tag-chip').forEach(el => { el.textContent = space.tag; });
  applySpaceShots();
}
swatches.forEach(swatch => {
  swatch.addEventListener('click', () => selectSpace(swatch.dataset.space));
});
selectSpace('blue');

// A screenshot that opens in the viewer when pressed.
function screenshotButton(url, caption, width, height) {
  const button = document.createElement('button');
  button.className = 'screenshot-open';
  button.dataset.image = url;
  button.dataset.caption = caption;
  button.setAttribute('aria-label', T.viewer.zoomLabel(caption));
  const image = document.createElement('img');
  image.loading = 'lazy';
  image.src = url;
  image.alt = T.viewer.screenAlt(caption);
  image.width = width;
  image.height = height;
  button.append(image);
  return button;
}

function showIn(container, element) {
  container.replaceChildren(element);
  container.classList.remove('panel-enter');
  // Restart the short transition only on explicit navigation.
  void container.offsetWidth;
  container.classList.add('panel-enter');
}

// Clicks, arrows, Home and End move along a row of tabs.
function wireTabs(row, select) {
  row.forEach((tab, index) => {
    tab.addEventListener('click', () => select(tab));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % row.length;
      if (event.key === 'ArrowLeft') next = (index - 1 + row.length) % row.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = row.length - 1;
      if (next !== undefined) {
        event.preventDefault();
        row[next].focus();
        select(row[next]);
      }
    });
  });
}

function markSelected(row, selected) {
  row.forEach(tab => {
    const active = tab === selected;
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
  });
}

const screens = T.screens;
const tabs = [...document.querySelectorAll('[role="tab"][data-screen]')];
const dynamicScreen = document.querySelector('#dynamic-screen');
const panel = document.querySelector('#showcase-panel');
function selectScreen(name) {
  const screen = screens[name];
  markSelected(tabs, tabs.find(tab => tab.dataset.screen === name));
  panel.setAttribute('aria-labelledby', `tab-${name}`);
  document.querySelector('.showcase-number').textContent = screen.number;
  document.querySelector('#showcase-title').innerHTML = screen.title;
  document.querySelector('#showcase-description').textContent = screen.description;
  document.querySelector('#showcase-points').replaceChildren(...screen.points.map(text => {
    const li = document.createElement('li');
    li.textContent = text;
    return li;
  }));
  const url = screen.perSpace ? spaceShotUrl(screen.image, currentSpace) : `assets/screenshots/${screen.image}.webp`;
  const button = screenshotButton(url, screen.caption, 1080, 2424);
  if (screen.perSpace) button.dataset.spaceShot = screen.image;
  showIn(dynamicScreen, button);
}
wireTabs(tabs, tab => selectScreen(tab.dataset.screen));
selectScreen('capture');

// Web app: each tab swaps the desktop screenshot and the one of the installed PWA on a phone.
const webTabs = [...document.querySelectorAll('[role="tab"][data-web-screen]')];
function selectWebScreen(tab) {
  const name = tab.dataset.webScreen;
  const screen = T.web[name];
  markSelected(webTabs, tab);
  document.querySelector('#web-panel').setAttribute('aria-labelledby', tab.id);
  showIn(document.querySelector('#web-screen'), screenshotButton(`assets/screenshots/${screen.desktop}.webp`, screen.desktopAlt, 2200, 1375));
  showIn(document.querySelector('#web-phone-screen'), screenshotButton(`assets/screenshots/${screen.phone}.webp`, screen.phoneAlt, 1080, 2424));
  document.querySelector('#web-caption').textContent = screen.caption;
}
wireTabs(webTabs, selectWebScreen);
selectWebScreen(webTabs[0]);

document.querySelector('#year').textContent = new Date().getFullYear();

// A single viewer works for static gallery images and the changing tab preview.
const viewer = document.querySelector('#screenshot-viewer');
const viewerImage = viewer.querySelector('.viewer-image');
let imageTrigger;
document.addEventListener('click', event => {
  const trigger = event.target.closest('.screenshot-open');
  if (!trigger) return;
  imageTrigger = trigger;
  viewerImage.src = trigger.dataset.image;
  viewerImage.alt = trigger.querySelector('img').alt;
  viewer.querySelector('.viewer-caption').textContent = trigger.dataset.caption;
  viewer.showModal();
  document.body.classList.add('viewer-open');
});
viewer.querySelector('.viewer-close').addEventListener('click', () => viewer.close());
viewer.addEventListener('click', event => { if (event.target === viewer) viewer.close(); });
viewer.addEventListener('close', () => {
  document.body.classList.remove('viewer-open');
  imageTrigger?.focus({ preventScroll: true });
});

// Header gains a soft background once the page is scrolled.
const siteHeader = document.querySelector('.site-header');
const updateHeader = () => siteHeader.classList.toggle('scrolled', window.scrollY > 8);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

// Warm the cache with the other space screenshots so colour changes never flash.
window.addEventListener('load', () => {
  setTimeout(() => {
    Object.keys(spaces).forEach(key => { new Image().src = spaceShotUrl('capture', key); });
  }, 1500);
});
