import { Job } from './job';
import { ReadStreamHelper } from '../helper/read-stream-helper';
import { UpdateBufferOnMatchStream } from '../streams/update-buffer-on-match-stream';
import { WriteStreamHelper } from '../helper/write-stream-helper';
const es = require('event-stream');
const SUMMARY_OUTPUT_PATH = process.env.SUMMARY_OUTPUT_PATH || './output/summaries/GroupedOrders.json';
const BUFFER_FILE_PATH = process.env.BUFFER_FILE_PATH || './output/summaries/buffer.json';
export class UpdateSummaryStreamJob extends Job {
  run(): boolean {
    let readStream = ReadStreamHelper.getReadStream(SUMMARY_OUTPUT_PATH);
    let bufferFileStream = WriteStreamHelper.getWriteStream(BUFFER_FILE_PATH);

    readStream
      .pipe(es.split())
      .pipe(UpdateBufferOnMatchStream)
      .pipe(bufferFileStream);

// UpdateBufferMapOnMatch
    //WriteToBufferFile

    // --
    //   Copy BufferMap To BufferFile
  //Rename BufferFile To SummaryOutputFile

  }

}
