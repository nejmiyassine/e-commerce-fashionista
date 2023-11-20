import moment from 'moment';

export const formatDate = (dateTime) => moment(dateTime).format('MMM Do YY');

export const formatDateFromNow = (dateTime) => moment(dateTime).fromNow();
