/**
 * FIXME: Using dayjs as an external utility package which can help me display
 * the timestamp on each post in a human readable format.
 */
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export default dayjs;