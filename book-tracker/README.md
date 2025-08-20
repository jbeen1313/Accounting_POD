# Book Tracker App

A simple React Native (Expo) application for children to scan books, track progress, and take basic comprehension quizzes.

## Features
- Scan ISBN barcodes to log books
- Fetch book details from Open Library
- Generate 5-question multiple choice quizzes using OpenAI
- Track progress toward 1,000 books
- Save books and quiz scores locally
- Simple name-based login for kids

## Setup
1. Install [Node.js](https://nodejs.org/) and [Expo CLI](https://docs.expo.dev).
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with your OpenAI key:
   ```env
   OPENAI_API_KEY=your_key_here
   ```
4. Run the project:
   ```bash
   npm start
   ```

Scan the QR code with the Expo Go app on your device to test.

## Testing
Run unit tests for service functions:

```bash
npm test
```

## Notes
- This prototype uses local storage for simplicity. Consider adding real authentication and cloud storage for multiple users.

## Deploying to GitHub Pages
1. Update the `homepage` field in `package.json` with your GitHub username.
2. Build and publish the static site:
```bash
npm run deploy
```
This exports the web build and pushes it to the `gh-pages` branch for hosting.
