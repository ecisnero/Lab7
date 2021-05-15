// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

// Make sure you register your service worker here too

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        document.querySelector('main').appendChild(newPost);
      });
    });
});

const entryPage = document.querySelector("entry-page");
const settingsIcon = document.querySelector("img");
settingsIcon.addEventListener('click', () => {
  if(history.state === "settings") return;
  setState("settings");
  history.pushState("settings", "", "#settings");
  console.log(location.origin);
});

const journalHeader = document.querySelector("h1");
journalHeader.addEventListener('click', () => {
  if(history.state === null) return;
  setState();
  history.pushState(null, "", location.origin);
});

const journalMain = document.querySelector("main");
journalMain.addEventListener('click', (event) => {
  let entryClicked = event.target;
  if (entryClicked === journalMain) return;
  let entryNumber = getEntryNumber(entryClicked.entry);
  setState("single-entry", entryClicked.entry, entryNumber);
  history.pushState(entryClicked.entry, "", ("#entry" + entryNumber));
});

window.onpopstate = event => {
  if (event.state === "settings") {
    setState("settings");
  }
  else if (event.state === null) {
    setState();
  }
  else {
    setState("single-entry", event.state, getEntryNumber(event.state));
  }
}

function getEntryNumber(entry) {
  for (let i = 0; i < journalMain.children.length; i++) {
    if (journalMain.children[i].entry.title == entry.title
      && journalMain.children[i].entry.date == entry.date) {
      return i + 1;
    }
  }
}
