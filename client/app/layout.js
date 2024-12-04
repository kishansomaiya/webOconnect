import './globals.css';
import Navbar from './components/Navbar';

export const metadata = {
  title: 'WebOconnect',
  description: 'A simple social media app using Next.js and Express.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
