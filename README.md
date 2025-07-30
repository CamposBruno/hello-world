# Hello World - Multi-Language

A beautiful, modern Hello World page built with React, Next.js, and Tailwind CSS. This Single Page Application (SPA) features a dynamic, minimalist design with animated background elements and multi-language support.

## Features

- **Modern Design**: Clean, minimalist interface with a blurred dynamic background
- **Colorful Background**: Animated colorful shapes and forms that create a vibrant, blurred background
- **Multi-Language Support**: Displays "Hello World" in 6 different languages:
  - English: "Hello World"
  - Spanish: "Hola Mundo"
  - French: "Bonjour le Monde"
  - Italian: "Ciao Mondo"
  - German: "Hallo Welt"
  - Portuguese: "Olá Mundo"
- **Smooth Animations**: 3-second display duration with smooth transitions between languages
- **Responsive Design**: Optimized for all screen sizes
- **Floating Particles**: Subtle animated particles for enhanced visual appeal

## Technologies Used

- **React 18**: For component-based UI development
- **Next.js 15**: For server-side rendering and routing
- **TypeScript**: For type safety and better development experience
- **Tailwind CSS**: For utility-first styling and responsive design

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to `http://localhost:3000`

## How It Works

The page displays "Hello World" in English for 3 seconds, then smoothly transitions to display the same greeting in 5 other languages. Each language is shown for 3 seconds before transitioning to the next one, creating a continuous loop.

The background features animated, blurred colorful shapes that create a dynamic and modern aesthetic while maintaining the minimalist design approach.

## Project Structure

```
src/
├── app/
│   ├── page.tsx          # Main Hello World component
│   ├── layout.tsx        # Root layout component
│   └── globals.css       # Global styles
```

## Development

- **Hot Reload**: Changes are reflected immediately in the browser
- **TypeScript**: Full type safety for better development experience
- **ESLint**: Code quality and consistency

## Deployment

This project can be easily deployed to Vercel, Netlify, or any other hosting platform that supports Next.js applications.

---

Built for Linear Issue HAS-5: "Create a hello world page"
