import { Message, OnMessageSend } from "./index";
import React, { FunctionComponent, useEffect, useState } from "react";
import style from "./style/SendMessage.scss";
import { FileAttachment, FileType } from "./Attachment/FileAttachment";
import { AttachmentPreview } from "./Attachment/AttachmentPreview/AttachmentPreview";
import { Input } from "./Input";
import { CustomFactories } from "./Message/MessageFactory";

interface Props {
    onSend?: OnMessageSend;
    loadingSpinner?: JSX.Element;
    buttons?: Partial<SendMessageButtons>;
    customFactories?: CustomFactories;
    disableAttachments?: boolean;
    attachmentFileTypes?: Array<FileType>;
    isUploading?: boolean;
    dropAttachment?: Message;
}

export interface SendMessageButtons {
    send: JSX.Element;
}

export const SendMessage: FunctionComponent<Props> = ({
    onSend,
    loadingSpinner,
    buttons,
    customFactories,
    disableAttachments = false,
    attachmentFileTypes,
    isUploading,
    dropAttachment,
}: Props) => {
    const [attachmentMessage, setAttachmentMessage] = useState<Message | null>(
        null
    );

    useEffect(() => {
        if (!dropAttachment) return;
        setAttachmentMessage(dropAttachment);
    }, [dropAttachment]);

    const onFileChanged = (file: Message) => {
        setAttachmentMessage(file);
    };

    const onAttachmentPreviewClose = () => {
        setAttachmentMessage(null);
    };

    return (
        <div className={style.message_container}>
            <Input onSend={onSend} sendButton={buttons?.send} />
            {!disableAttachments && (
                <FileAttachment
                    onSelectFile={onFileChanged}
                    attachmentFileTypes={attachmentFileTypes}
                    loadingSpinner={loadingSpinner}
                    isUploading={isUploading}
                />
            )}
            {attachmentMessage && (
                <AttachmentPreview
                    attachment={attachmentMessage}
                    onCancel={onAttachmentPreviewClose}
                    onSend={onSend}
                    loadingSpinner={loadingSpinner}
                    customFactories={customFactories}
                />
            )}
        </div>
    );
};