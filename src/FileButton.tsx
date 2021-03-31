import React from "react";
import style from "./style/FileButton.scss";
import { FileType } from "./FileAttachment";

interface Props {
    children?: JSX.Element;
    fileType: FileType;
    onSelect?: (file: File) => unknown;
    color: string;
}

const FileTypeRegex: Record<FileType, string> = {
    audio: "audio.*",
    video: "video.*",
    image: "image.*",
    document: "application/pdf",
    any: ".*",
};

export function FileButton(props: Props): JSX.Element {
    const onChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file =
            event.target.files !== null && event.target.files.length > 0
                ? event.target.files[0]
                : null;
        if (file === null) return;
        const fileTypeMatches = file.type.match(FileTypeRegex[props.fileType]);
        if (!fileTypeMatches) return;
        if (!props.onSelect) return;
        props.onSelect(file);
    };

    return (
        <label
            className={style.file_button}
            style={{
                backgroundColor: props.color,
            }}
        >
            <div className={style.darken} />
            <input
                type="file"
                onChange={onChangeFile}
                accept={FileTypeRegex[props.fileType].replace(".", "/")}
            />
            {props.children}
        </label>
    );
}
