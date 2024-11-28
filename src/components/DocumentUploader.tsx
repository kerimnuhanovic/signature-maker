import { FileUploader } from 'react-drag-drop-files';

interface DocumentUploaderProps {
    handleFileChange: (file: File) => Promise<void>;
    fileTypes: string[];
}

export const DocumentUploader = ({ handleFileChange, fileTypes}: DocumentUploaderProps) => {
    return (
        <div className='w-screen h-screen flex justify-center items-center'>
          <FileUploader handleChange={handleFileChange} name="pdf" types={fileTypes} />
        </div>
    )
}