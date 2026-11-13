🚀 Typing Speed Test

A clean and interactive Typing Speed Test Web App built using HTML, CSS, and JavaScript.
This project measures your typing speed (WPM), accuracy, mistakes, and typed characters with real-time updates.

📸 Preview

The interface includes:
A typing passage

Timer control (15s / 30s / 60s)

Real-time WPM & accuracy

Mistakes counter

Best WPM saved with localStorage

Reset & Next Passage buttons
```bash
📂 Project Structure
project-folder/
│
├── index.html      → Main HTML file
├── style.css       → UI styles
└── script.js       → Typing logic + stats + timer
```
✨ Features
✅ Real-time Typing Metrics

Words Per Minute (WPM)

Accuracy percentage

Characters typed

Mistakes count

✅ Timer Options

Choose between:

15s

30s

60s

✅ Intelligent Typing Guide

Current character highlighted

Correct = green

Wrong = red

✅ Best Score Saved

Automatically stores your Best WPM in localStorage.

✅ Responsive UI

Looks clean on mobile & desktop.

🛠️ How to Use

Open index.html in any browser.

Click Start.

Begin typing in the text area.

Watch live WPM, accuracy, and mistake stats.

Click Reset to restart.

Click Next passage to load a new sentence.

📦 Installation (Bash Terminal Style)

Clone the repository using:
```bash
$ git clone https://github.com/yourusername/typing-speed-test.git
```

Move into the folder:
```bash
$ cd typing-speed-test
```

Open the project (Explorer / Finder / VS Code):
```bash
$ code .
```

Now open:

index.html


No setup, no dependencies — just open and run.

🧮 WPM Formula (How It Works)
WPM = (Correct Characters / 5) / (Elapsed Time in Minutes)


Accuracy:

Accuracy = (Correct Characters / Total Typed Characters) × 100

🧑‍💻 Technologies Used

HTML5

CSS3

Vanilla JavaScript

LocalStorage API

📘 License

This project is open-source and free to use or modify.

❤️ Contributing

Feel free to open issues or submit PRs with improvements.