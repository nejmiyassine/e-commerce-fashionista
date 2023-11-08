import moment from 'moment';

export const formatDate = (dateTime) => moment(dateTime).format('MMM Do YY');
