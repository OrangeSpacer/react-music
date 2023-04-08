export interface IFile {
	createFile: (file: IMulter, type: TYPE_FILE) => void;
	deleteFIle: (deleteFilePath: string) => void;
}

export interface IMulter {
	fieldname: string;
	originalname: string;
	encoding: string;
	mimetype: string;
	buffer: Buffer;
	size: number;
}

export enum TYPE_FILE {
	AUDIO = "audio",
	IMAGE = "image",
}
