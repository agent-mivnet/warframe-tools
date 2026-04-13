import './globals.css';

export const metadata = {
  title: 'Warframe Tools',
  description: 'Task Checklist & Collections Tracker for Warframe',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="shortcut icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-icon.svg" type="image/svg+xml" />
      </head>
      <body>{children}</body>
    </html>
  );
}
