# Accounting POD Weekly Meeting Deck

This folder contains a lightweight, browser-based slide deck for weekly Accounting POD meetings. It uses IndexedDB to store meeting updates and notes locally in the browser.

## Features
- Corporate navy/light blue/white/gray theme
- Progress, challenges, action items, and priorities slides
- Local note-taking with persistent storage in IndexedDB
- Inline form to add new updates during the meeting

## Run Locally
Use any static file server. For example:

```bash
npx serve .
```

Then open the provided local URL in your browser.

## Data Storage
All updates and notes are stored in IndexedDB under the `podDeckDB` database. Clearing browser data removes saved items.
