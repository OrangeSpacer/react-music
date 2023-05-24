export interface IFileInput {
    inputText?: string
    placeholder?: string
    required: boolean
    fileType: "audio/*" | "image/*"
    errors: string
    register: any
}