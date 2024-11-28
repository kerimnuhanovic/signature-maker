export const generatePdfName = (filename: string): string => {
    if (filename.endsWith('.pdf')) {
      return filename.replace(/\.pdf$/, '-modified.pdf');
    }
    return filename;
}