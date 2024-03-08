// Import required modules. This assumes a Node.js environment with 'csv-parser' and 'fs'.
import fs from 'fs';
import csvParser from 'csv-parser';
import stream from 'stream';
import { promisify } from 'util';

const finished = promisify(stream.finished);


export async function processCsvFile(filePath: string): Promise<any[]> {
    const modifiedRows: any[] = [];
  
    // Create a read stream and pipe it through csv-parser
    const readStream = fs.createReadStream(filePath).pipe(csvParser());
  
    readStream.on('data', (row: any) => {
      const promptRegex = /\[insert [^\]]+\]|\{insert [^\}]+\}/gi;

      // Check if the regex matches at least 1 instance before adding the row to modifiedRows
      if (row.prompt.match(promptRegex)) {
        const modifiedPrompt = row.prompt.replace(promptRegex, '<question>');
        const modifiedRow = { ...row, prompt: modifiedPrompt.replaceAll('\n', '') };
        modifiedRows.push(modifiedRow);
      }
    });
  
    // Wait for the stream to finish processing
    await finished(readStream);
  
    return modifiedRows;
  }