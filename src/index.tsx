import * as React from "react";
import { ChatMessage, Message } from "./Message/Message";
import { MessageContainer } from "./Message/MessageContainer";
import { SendMessage, SendMessageButtons } from "./SendMessage";
import style from "./style/Main.scss";
import { LoadingIndicator } from "./LoadingIndicator";
import { CustomFactories } from "./Message/MessageFactory";
import { FileType } from "./Attachment/FileAttachment";
import { useDropzone } from "./Util/Dropzone";
export * from "./Message/Message";
export { MessageContainer };

export type OnMessageSend = (message: Message) => unknown;

interface Props {
    messages: Array<ChatMessage>;
    userId: string;
    onSend?: OnMessageSend;
    loadingSpinner?: JSX.Element;
    buttons?: Partial<SendMessageButtons>;
    customFactories?: CustomFactories;
    disableAttachments?: boolean;
    attachmentFileTypes?: Array<FileType>;
    isUploading?: boolean;
}

export const Chat: React.FunctionComponent<Props> = ({
    messages,
    userId,
    onSend,
    loadingSpinner = <LoadingIndicator />, // Default value provided here
    buttons,
    customFactories,
    disableAttachments,
    attachmentFileTypes,
    isUploading,
}: Props) => {
    const { dropzoneContainerProps, feedbackContainer } = useDropzone();

    return (
        <div className={style.main} {...dropzoneContainerProps}>
            <div className={style.container}>
                <MessageContainer
                    userId={userId}
                    messages={messages}
                    factoryOverride={customFactories}
                    loadingSpinner={loadingSpinner}
                />
                <SendMessage
                    onSend={onSend}
                    loadingSpinner={loadingSpinner}
                    buttons={buttons}
                    customFactories={customFactories}
                    disableAttachments={disableAttachments}
                    attachmentFileTypes={attachmentFileTypes}
                    isUploading={isUploading}
                />
            </div>
            {feedbackContainer}
        </div>
    );
};
