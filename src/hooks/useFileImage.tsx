import { keys } from 'lodash-es';
import { useState } from 'react';
interface FileData {
  [key: string]: any;
}

interface Data {
  fileData: FileData;
}

import file7z from '@/assets/img/attachment/file7z.png';
import fileAac from '@/assets/img/attachment/fileAac.png';
import fileAvi from '@/assets/img/attachment/fileAvi.png';
import fileBmp from '@/assets/img/attachment/fileBmp.png';
import fileCer from '@/assets/img/attachment/fileCer.png';
import fileCsv from '@/assets/img/attachment/fileCsv.png';
import fileDoc from '@/assets/img/attachment/fileDoc.png';
import fileDocx from '@/assets/img/attachment/fileDocx.png';
import fileGif from '@/assets/img/attachment/fileGif.png';
import fileHtm from '@/assets/img/attachment/fileHtm.png';
import fileHtml from '@/assets/img/attachment/fileHtml.png';
import fileJpeg from '@/assets/img/attachment/fileJpeg.png';
import fileJpg from '@/assets/img/attachment/fileJpg.png';
import fileMov from '@/assets/img/attachment/fileMov.png';
import fileMp3 from '@/assets/img/attachment/fileMp3.png';
import fileMp4 from '@/assets/img/attachment/fileMp4.png';
import filePdf from '@/assets/img/attachment/filePdf.png';
import filePng from '@/assets/img/attachment/filePng.png';
import filePpt from '@/assets/img/attachment/filePpt.png';
import filePptx from '@/assets/img/attachment/filePptx.png';
import fileRar from '@/assets/img/attachment/fileRar.png';
import fileTiff from '@/assets/img/attachment/fileTiff.png';
import fileTxt from '@/assets/img/attachment/fileTxt.png';
import fileWav from '@/assets/img/attachment/fileWav.png';
import fileWmv from '@/assets/img/attachment/fileWmv.png';
import fileXls from '@/assets/img/attachment/fileXls.png';
import fileXlsx from '@/assets/img/attachment/fileXlsx.png';
import fileXml from '@/assets/img/attachment/fileXml.png';
import fileZip from '@/assets/img/attachment/fileZip.png';

const useFileImage = () => {
  const [data] = useState<Data>({
    fileData: {
      '7z': file7z,
      aac: fileAac,
      avi: fileAvi,
      bmp: fileBmp,
      cer: fileCer,
      csv: fileCsv,
      doc: fileDoc,
      docx: fileDocx,
      gif: fileGif,
      htm: fileHtm,
      html: fileHtml,
      jpeg: fileJpeg,
      jpg: fileJpg,
      mov: fileMov,
      mp3: fileMp3,
      mp4: fileMp4,
      pdf: filePdf,
      png: filePng,
      ppt: filePpt,
      pptx: filePptx,
      rar: fileRar,
      tiff: fileTiff,
      txt: fileTxt,
      wav: fileWav,
      wmv: fileWmv,
      xls: fileXls,
      xlsx: fileXlsx,
      xml: fileXml,
      zip: fileZip
    }
  });
  const handleFile = (_: string) => {
    const _s = _.toLocaleLowerCase();
    return keys(data.fileData).indexOf(_s) !== -1
      ? data.fileData[_s]
      : data.fileData.txt;
  };

  return { handleFile };
};
export default useFileImage;
