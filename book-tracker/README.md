# Book Tracker App

A simple React Native (Expo) application for children to scan books, track progress, and take basic comprehension quizzes.

## Features
- Scan ISBN barcodes to log books
- Fetch book details from Open Library
- Generate 5-question multiple choice quizzes using OpenAI
- Track progress toward 1,000 books

## Setup
1. Install [Node.js](https://nodejs.org/) and [Expo CLI](https://docs.expo.dev).
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set your OpenAI API key:
   ```bash
   export OPENAI_API_KEY=your_key_here
   ```
4. Run the project:
   ```bash
   npm start
   ```

Scan the QR code with the Expo Go app on your device to test.

## Notes
- This is a basic prototype and does not persist data between sessions.
- Consider adding authentication and persistent storage (e.g., Firebase) for production use.
