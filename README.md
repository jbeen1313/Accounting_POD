# Accounting POD Slide Deck

This project provides an interactive slide deck for weekly Accounting POD meetings using **Reveal.js** and a simple **Express** backend with **SQLite** for data storage.

## Setup

1. Install Node.js dependencies (internet access required):
   ```bash
   npm install
   ```
2. Start the server:
   ```bash
   npm start
   ```
3. (Optional) Seed sample data:
   ```bash
   node backend/seed.js
   ```
4. Open your browser at [http://localhost:3000](http://localhost:3000) to view the slides.

## Project Structure

- `backend/` – Express server and SQLite database setup.
- `slides/` – Reveal.js HTML slide templates.
- `assets/` – Icons and images.

## Adding Content

- Update the database tables (`progress`, `action_items`, `priorities`, `notes`) via the API endpoints or using a SQLite editor.
- Modify slide templates in `slides/index.html` to adjust layout or color scheme.

