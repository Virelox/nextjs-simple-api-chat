import './globals.css';
import type { Metadata } from 'next';

import { Poppins } from 'next/font/google';

const inter = Poppins({ subsets: ['latin'], weight: ['300', '500', '700', '900'] });

export const metadata: Metadata = {
    title: 'Simple API Chat',
    description: 'Simple API Chat by next.js app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en'>
            <body className={inter.className}>{children}</body>
        </html>
    );
}
