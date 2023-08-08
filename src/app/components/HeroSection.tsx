import Image from 'next/image';

export const HeroSection = () => {
    return (
        <div className='flex xl:flex-col flex-row xl:basis-[35%] basis-[10%] h-full w-full justify-center items-center xl:shadow-none shadow-3xl z-[5] bg-bg-lighter'>
            <div className='flex flex-col xl:w-[70%] xl:h-[70%] w-[10%] h-[40%] relative overflow-hidden justify-center items-center'>
                <Image
                    layout='fill'
                    objectFit='contain'
                    className='flex xl:scale-[80%] blur-xl logo-animation '
                    src='/img/ai.svg'
                    alt='photo of blue robot with black accent'
                    priority={true}
                />
                <Image layout='fill' objectFit='contain' className='flex xl:scale-[80%]' src='/img/ai.svg' alt='photo of blue robot with black accent' priority={true} />
            </div>
            <span className='text-xl xl:text-2xl ml-[10px] xl:ml-0'>SIMPLE API CHAT</span>
        </div>
    );
};
