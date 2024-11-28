import { useRef, useState } from "react";
import { FILE_TYPES, INITIAL_RECTANGLE } from "../constants/constants";
import { DocumentUploader } from "./DocumentUploader";
import { DocumentViewer } from "./DocumentViewer";
import { RectangleShape } from "./Rectangle";
import { PDFDocument, rgb } from "pdf-lib";
import { pdfjs } from "react-pdf";
import { FileData } from "../models/FileData";
import { generatePdfName } from "../utils/utils";
import { ButtonDashboard } from "./ButtonDashboard";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

export const AddMarkerPage = () => {
    const [fileData, setFileData] = useState<FileData | null>(null);
    const [rect, setRect] = useState(INITIAL_RECTANGLE);
    const linkRef = useRef<HTMLAnchorElement>(null);

    const handleFileChange = async (file: File) => {
        const arrayBuffer = await file.arrayBuffer();

        const pdfDoc = await PDFDocument.load(arrayBuffer);

        setFileData({
            file: file,
            numberOfFilePages: pdfDoc.getPages().length,
            currentPage: 1,
            fileArrayBuffer: arrayBuffer
        })
    };

    const savePDF = async () => {
        if (!fileData) return;

        const pdfDoc = await PDFDocument.load(fileData.fileArrayBuffer);

        const page = pdfDoc.getPages()[fileData.currentPage - 1];
        const { height } = page.getSize();

        page.drawRectangle({
            x: rect.x,
            y: height - rect.y - rect.height,
            width: rect.width,
            height: rect.height,
            borderColor: rgb(0.07, 0.09, 0.16),
            borderWidth: 2,
            borderDashArray: [3, 2]
        });

        const updatedPdfBytes = await pdfDoc.save();

        
        const blob = new Blob([updatedPdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);

        if (linkRef.current) {
            linkRef.current.href = url;
            linkRef.current.download = generatePdfName(fileData.file.name);
            linkRef.current.click();
        }

        URL.revokeObjectURL(url);
    };

    const onPageChange = (page: number) => {
        if (!fileData || page < 1 || page > fileData.numberOfFilePages) {
            return
        }
        else {
            setFileData({
                ...fileData,
                currentPage: page
            });
        }
    }
    
    return (
        <div>
          {!fileData ? (
            <div className='w-screen h-screen flex justify-center items-center'>
              <DocumentUploader handleFileChange={handleFileChange} fileTypes={FILE_TYPES} />
            </div>
          )
           : (
            <div className='flex flex-col items-center mx-auto py-6 lg:w-fit'>
              <div className='overflow-x-auto w-full sm:flex sm:justify-center mx-auto lg:w-fit'>
                <div className='relative w-fit border-dashed border border-red-900 border-4'>
                    <DocumentViewer file={fileData.file} currentPage={fileData.currentPage} />
                    <RectangleShape rectangle={rect} setRectangle={setRect} />
                </div>  
              </div> 
              <ButtonDashboard 
                onPreviousClick={() => {onPageChange(fileData.currentPage - 1)}} 
                onNextClick={() => {onPageChange(fileData.currentPage + 1)}}
                onSaveClick={savePDF}
                isPreviousDisabled={fileData.currentPage === 1}
                isNextDisabled={fileData.currentPage === fileData.numberOfFilePages}
                onCancelClick={() => setFileData(null)}
              />
              <a ref={linkRef} className="hidden" />
            </div>
          )}
        </div>
      );
}