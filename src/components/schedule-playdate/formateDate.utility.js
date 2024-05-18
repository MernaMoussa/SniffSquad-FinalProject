export function formatDate(playdateData) {
  console.log(playdateData.id);

  const otherParticipant = playdateData?.otherParticipant || [];
  console.log(otherParticipant);

  const startDate = new Date(playdateData.date);
  const timeParts = playdateData.time.split(":");
  const startTime = new Date();
  startTime.setHours(parseInt(timeParts[0], 10));
  startTime.setMinutes(parseInt(timeParts[1], 10));

  const formattedStart = new Date(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate(),
    startTime.getHours(),
    startTime.getMinutes()
  );

  const formattedEnd = new Date(formattedStart.getTime() + 60 * 60 * 1000);
  return {
    event_id: playdateData.id,
    title: playdateData.content,
    start: formattedStart,
    end: formattedEnd,
    admin_id: otherParticipant.map((participant) => participant.id || "")[0],
  };
}

export function formatNotificationDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear().toString().slice(-2);

  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;

  return `${formattedDay}/${formattedMonth}/${year}`;
}
