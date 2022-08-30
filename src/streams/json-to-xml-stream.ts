import { XMLBuilder } from 'fast-xml-parser';

export class JsonToXmlStream {
  transform(jsonObj: Object) {
    const builder = new XMLBuilder({});
    return builder.build(jsonObj);
  }
}
