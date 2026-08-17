export const minCheckInDate = new Date().toISOString().split('T')[0];

export const tomorrow = new Date(Date.now() + 86400000)
  .toISOString()
  .split('T')[0];

export const calculatedMinCheckOutDate = (checkInDate: string) => {
  return new Date(new Date(checkInDate).getTime() + 86400000)
    .toISOString()
    .split('T')[0];
};

export const toDateInputFormat = (dateStr: string): string =>
  dateStr?.split('T')[0] ?? '';
