import { Job } from './job';
import { ReadStreamHelper } from '../helper/read-stream-helper';
import { UpdateBufferOnMatchStream } from '../streams/update-buffer-on-match-stream';
import { WriteStreamHelper } from '../helper/write-stream-helper';
import { pipeline } from 'stream/promises';
const es = require('event-stream');
const SUMMARY_OUTPUT_PATH = process.env.SUMMARY_OUTPUT_PATH || './output/summaries/GroupedOrders.json';
export class UpdateSummaryStreamJob extends Job {
  run(): boolean {
    let readStream = ReadStreamHelper.getReadStream(SUMMARY_OUTPUT_PATH);
    let summaryFileStream = WriteStreamHelper.getWriteStream(SUMMARY_OUTPUT_PATH);

    const res = (async () =>
      await pipeline(readStream
      .pipe(es.split())
      .pipe(UpdateBufferOnMatchStream)
      .pipe(summaryFileStream)))();


    // UpdateBufferMapOnMatch
    //WriteToBufferFile
    // --
    //   Copy BufferMap To BufferFile
  //Rename BufferFile To SummaryOutputFile
return false;
  }

}
