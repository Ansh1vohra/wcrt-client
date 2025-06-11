// lib/utils.ts
export function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour12: true,
      timeZone: 'UTC'
    }).split(',')[0];
  }