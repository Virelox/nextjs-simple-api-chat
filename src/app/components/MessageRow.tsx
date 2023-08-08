import { Role } from '../enums/Chat';
import { Message } from '../interfaces/Chat';
import clsx from 'clsx';

export const MessageRow = ({ data }: { data: Message }) => {
    return (
        <div className={clsx('flex w-full h-auto py-[10px] md:pr-[20px] md:px-0 px-[20px]', data.role === Role.Ai ? 'justify-start' : 'justify-end')}>
            <div
                className={clsx(
                    'flex max-w-[70%] h-auto p-[15px] shadow-lg',
                    data.role === Role.Ai ? 'bg-bg-ai-message rounded-3xl rounded-bl-[0]' : 'bg-bg-message rounded-3xl rounded-br-[0]'
                )}
            >
                <span>{data.content}</span>
            </div>
        </div>
    );
};
