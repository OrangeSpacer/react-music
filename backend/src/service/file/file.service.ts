import { ApiError } from "../../exceptions/api.error";
import { IFile, IMulter, TYPE_FILE } from "./file.interface";
import * as path from "path";
import * as fs from "fs";
import { v4 } from "uuid";
import { injectable } from "inversify";

@injectable()
export class FileService implements IFile {
	public createFile(file: IMulter, type: TYPE_FILE): string | void {
		try {
			const fileExtension = file.originalname.split(".").pop();
			const fileName = v4() + "." + fileExtension;
			const filePath = path.resolve(__dirname, "../..", "static", type);
			if (!fs.existsSync(filePath)) {
				fs.mkdirSync(filePath, { recursive: true });
			}
			fs.writeFileSync(path.resolve(filePath, fileName), file.buffer);
			return `${type}/${fileName}`;
		} catch (e) {
			throw ApiError.badRequset("ошибка при записи файла", e);
		}
	}
	public deleteFIle(deleteFilePath: string): void {
		try {
			const filePath = path.resolve(__dirname, "../..", "static", deleteFilePath);
			if (!fs.existsSync(filePath)) {
				throw ApiError.badRequset("не найден путь до файла");
			}
			fs.unlinkSync(filePath);
		} catch (e) {
			throw ApiError.badRequset("не удалось удалить файл", e);
		}
	}
}
