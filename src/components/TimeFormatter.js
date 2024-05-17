import React from 'react';
import { format, isToday, isYesterday } from 'date-fns';

const TimeFormatter = ({ timestamp }) => {
  const formatMessageTime = (date) => {
    if (isToday(date)) {
      return format(date, "HH:mm");
    }
    if (isYesterday(date)) {
      return "Hôm qua " + format(date, "HH:mm");
    }
    return format(date, "dd/MM/yyyy HH:mm");
  };

  const date = new Date(timestamp);

  return <span>{formatMessageTime(date)}</span>;
};

export default TimeFormatter;