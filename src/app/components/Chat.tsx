import { useEffect, useRef, useState } from 'react';
import { Message } from '../interfaces/Chat';
import { MessageRow } from './MessageRow';
import { Role } from '../enums/Chat';
import Image from 'next/image';
import clsx from 'clsx';
import { nanoid } from 'nanoid';

export const Chat = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const chatRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const onMessageSend: () => Promise<void> = async () => {
        if (loading) return;

        const prompt = inputRef.current!.value;
        if (prompt.length > 0) {
            let newMessageList = [
                ...messages,
                {
                    role: Role.User,
                    content: prompt,
                },
            ];

            setMessages(newMessageList);
            inputRef.current!.value = '';
            setLoading(true);

            try {
                const response = await fetch('/api/bot', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ messages }),
                });

                if (!response.ok) {
                    newMessageList.push({
                        role: Role.Ai,
                        content: `Sorry, i cant help you now, i cant connect to the openai servers`,
                    });

                    setMessages(newMessageList);
                    return;
                }
                const data = await response.json();

                newMessageList.push({
                    role: data.role,
                    content: data.response,
                });

                setMessages(newMessageList);
            } catch (error) {
                newMessageList.push({
                    role: Role.Ai,
                    content: error.message,
                });

                setMessages(newMessageList);
            } finally {
                setLoading(false);
                scrollToBottom();
            }
        }
    };

    const scrollToBottom = () => {
        const lastChildElement = chatRef.current?.lastElementChild;
        lastChildElement?.scrollIntoView({ behavior: 'auto' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, loading]);

    return (
        <div className='flex flex-col xl:basis-[65%] basis-[90%] xl:h-full h-[80px] max-h-screen w-full px-[20px] py-[10px]'>
            <div className='flex flex-col w-full h-full'>
                <div ref={chatRef} className='flex flex-col w-full h-full overflow-x-auto'>
                    {messages?.map((message: Message) => {
                        return <MessageRow key={nanoid()} data={message} />;
                    })}
                </div>

                <div className='flex w-full h-[60px] py-[9px] md:px-[0px] px-[10px] text-white'>
                    <form
                        className='flex w-full'
                        onSubmit={(e) => {
                            e.preventDefault();
                            onMessageSend();
                        }}
                    >
                        <input
                            ref={inputRef}
                            placeholder='Send a message...'
                            type='text'
                            className='bg-[#0f0f0f] transition-colors duration-500 ease-in-out shadow-lg text-white text-base rounded-tl-3xl rounded-bl-3xl block w-full px-[20px] outline-none focus:border-accent focus:ring-[2px] focus:ring-accent ring-inset'
                        />
                    </form>
                    <button
                        disabled={!loading}
                        onClick={() => onMessageSend()}
                        type='button'
                        className={clsx(
                            'inline-flex items-center justify-center w-[50px] max-w-[50px] px-3 py-2 text-sm font-medium leading-4 text-white border border-transparent shadow-sm rounded-tr-3xl rounded-br-3xl hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 accent-accent bg-accent focus:ring-accent',
                            loading && 'cursor-not-allowed'
                        )}
                    >
                        {loading ? (
                            <div className='relative flex w-8 h-8 scale-150'>
                                <Image layout='fill' objectFit='contain' className='flex' src='/img/sending.svg' alt='loading icon' priority={true} />
                            </div>
                        ) : (
                            <div className='relative flex w-6 h-6'>
                                <Image layout='fill' objectFit='contain' className='flex' src='/img/send.svg' alt='send icon' priority={true} />
                            </div>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};
