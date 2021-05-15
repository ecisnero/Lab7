// sw.js - Service Worker

// You will need 3 event listeners:
//   - One for installation
//   - One for activation ( check out MDN's clients.claim() for this step )
//   - One for fetch requests

//Installation
var CACHE_NAME = 'lab7-cache';
var urlsToCache = [ 
  "./index.html", 
  "./style.css", 
  "./scripts", 
  "https://cse110lab6.herokuapp.com/entries"];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

//Activation
self.addEventListener('activate', function(event) {
    console.log("Service Worker Activated");
    event.waitUntil(clients.claim());
  });

//Fetching
self.addEventListener('fetch', function(event) {
    console.log("Fetched");
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          // Cache hit - return response
          if (response) {
            return response;
          }
          return fetch(event.request);
        }
      )
    );
  });