# Cute - Personal Portfolio

A modern, elegant personal portfolio and showcase website built with Next.js, featuring a hero section, gallery, live status integration and a beautiful themed experience.

## 🎨 Features

- **Responsive Design** - Adaptive layout that looks great on mobile, tablet, and desktop
- **Theme Support** - Theme toggle with persistent user preferences
- **Hero Section** - Eye-catching introduction with customizable content
- **Gallery** - Showcase your work and projects
- **Live Status** - Display your Discord status via Lanyard API integration
- **Social Links** - Easy access to your social media profiles
- **About Section** - Tell your story
- **Performance Optimized** - Built with Vercel Analytics and Speed Insights for monitoring
- **Modern Stack** - TypeScript, Tailwind CSS, Radix UI and React Compiler for optimal performance

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Bun, npm, yarn or pnpm

### Installation & Development

1. Install dependencies:

```bash
bun install
# or npm install / yarn install / pnpm install
```

2. Run the development server:

```bash
bun dev
# or npm run dev / yarn dev / pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000) to view the website

## 📁 Project Structure

```
src/
├── app/             # App Router
│   ├── page.tsx     # Main page
│   ├── layout.tsx   # Root layout
│   └── globals.css  # Global styles
├── components/      # Reusable UI components
│   ├── hero.tsx
│   ├── gallery.tsx
│   ├── about.tsx
│   ├── status.tsx
│   ├── socials.tsx
│   ├── footer.tsx
│   ├── theme-toggle.tsx
│   ├── theme-provider.tsx
│   └── section-title.tsx
├── context/        # React context providers
│   └── lanyard.tsx # Discord status integration
└── lib/            # Utilities
    └── utils.ts
```

## ⚙️ Configuration

- **Styling**: Tailwind CSS v4 with Tailwind Merge for class merging
- **UI Components**: Radix UI for accessible components
- **Icons**: Lucide React
- **Themes**: Next Themes for dark mode management
- **Analytics**: Vercel Analytics and Speed Insights

## 🔧 Build & Deploy

### Build for production:

```bash
bun run build
```

### Start production server:

```bash
bun start
```

### Run linting:

```bash
bun run lint
```

## 🚢 Deployment

This project is optimized for deployment on [Vercel](https://vercel.com), the platform created by Next.js's creators:

1. Push your code to GitHub
2. Import the repository in Vercel
3. Vercel automatically detects Next.js and configures the build settings
4. Your site is live!

[Deploy Now](https://vercel.com/new)

## 📚 Dependencies

- **Next.js 16** - React framework with App Router
- **React 19** - Modern React with latest features
- **TypeScript** - Type safety for JavaScript
- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Unstyled, accessible components
- **Next Themes** - Dark mode and theme switching
- **Vercel Analytics & Speed Insights** - Performance monitoring

## 📖 Learn More

- [Next.js Documentation](https://nextjs.org/docs) - React framework
- [Tailwind CSS](https://tailwindcss.com) - CSS framework
- [Radix UI](https://www.radix-ui.com) - UI components
- [Lanyard API](https://github.com/phineas/lanyard) - Discord status

## 📝 License

This project is open source and available under the MIT License.
