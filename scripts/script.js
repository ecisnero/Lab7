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
const documentBody = document.querySelector("body");

const settingsIcon = document.querySelector("img");
settingsIcon.addEventListener('click', () => {
  history.pushState(documentBody , "settings", "#Settings");
  //edit content
  documentBody.setAttribute("class", "settings");
  journalHeader.innerHTML = "Settings";
  //update state
  setState();
  
});

const journalHeader = document.querySelector("h1");
journalHeader.addEventListener('click', () => {
  //edit content
  documentBody.removeAttribute("class");
  journalHeader.innerHTML = "Journal Entries";
  //update state
  setState();
});

const journalMain = document.querySelector("main");
journalMain.addEventListener('click', (event) => {
  //edit content
  let entryClicked = event.target;
  let entryNumber = getEntryNumber(entryClicked);
  if(entryNumber == 0) return 0;
  documentBody.setAttribute("class", "single-entry");
  journalHeader.innerHTML = "Entry " + entryNumber;
  //update state
  setState();
});

function getEntryNumber(entry){
  if(entry == journalMain){
    return 0;
  } else{
    let JournalMainChildren = journalMain.children;
    for(let i = 0; i < JournalMainChildren.length; i++) {
      if(JournalMainChildren[i] === entry){
        return i + 1;
      }
    }
  }

}

