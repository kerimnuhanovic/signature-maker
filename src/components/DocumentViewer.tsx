import { Document, Page } from 'react-pdf';

interface DocumentViewerProps {
    file: File;
    currentPage: number;
}

export const DocumentViewer = ({ file, currentPage }: DocumentViewerProps) => {
    return (
        <Document file={file}>
            <Page pageNumber={currentPage} renderTextLayer={false} renderAnnotationLayer={false} />
        </Document>
    )
}