import * as day from 'dayjs';
import * as relativeTime from 'dayjs/plugin/relativeTime';

try {
    day.extend(<any>relativeTime);
} catch (e) {

}


const dayjs: any = day;

export default dayjs;
