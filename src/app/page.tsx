'use client';

import { useEffect } from 'react';

import { HeroSection } from './components/HeroSection';
import { Chat } from './components/Chat';

const Home = () => {
    useEffect(() => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);

        window.addEventListener('resize', () => {
            vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        });
    }, []);

    return (
        <div className='flex flex-col items-center justify-center w-screen h-screen overflow-hidden xl:flex-row bg-bg p-[0px]'>
            <HeroSection />
            <Chat />
        </div>
    );
};

export default Home;
