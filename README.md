# Overtimer

A modern web app for registering and tracking worked overtime. Built with React, TypeScript, Vite, and Tailwind CSS, Overtimer provides a clean, mobile-friendly interface for logging, editing, and managing overtime entries.

***Note!*** *A fair 90/95% of the code, including this README apart from this note, was created using LLMs (claude-3.5-sonnet and gpt-4.1 models). This project was a private labproject for trying out [Cursor](https://cursor.com/).*

---

## Features
- Register overtime entries with date, hours, and minutes
- Edit and delete existing entries
- Modern, responsive UI with mobile support
- ShadcnUI-inspired date picker
- Dark mode and accessible color scheme
- PWA-ready with custom black & white icon

---

## Getting Started

### Prerequisites
- Node.js (v18 or newer recommended)
- npm (v9 or newer)

### Installation
```bash
npm install
```

### Development
Start the development server with hot reload:
```bash
npm run dev
```
Visit [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build
```bash
npm run build
npm run preview
```

---

## Usage
- **Add Entry:** Click the "+" or "Add Entry" button. Select a date, enter hours and minutes, then save.
- **Edit Entry:** Click an entry to open the edit modal. Adjust values and update.
- **Delete Entry:** Use the delete button in the edit modal to remove an entry.
- **Date Picker:** Uses a modern, accessible calendar. The calendar popover always appears above modals.
- **Mobile:** Add to home screen for a native-like experience. Custom icon included.

---

## Technology Stack
- **React** (with TypeScript)
- **Vite** (build tool)
- **Tailwind CSS v4** (utility-first styling)
- **ShadcnUI** (date picker and UI patterns)
- **Radix UI** (popover, accessibility)

---

## PWA & Icons
- App includes a black & white icon representing overtime registration (clock).
- Mobile and desktop icons: `public/icon-192.png`, `public/icon-512.png`.
- Favicon and Apple Touch icons are set in `index.html`.

---

## Contributing
Pull requests and issues are welcome! Please open an issue to discuss major changes.

---

## License
MIT License. See [LICENSE](LICENSE) for details.
