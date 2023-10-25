type EventTime = {
  displayValue: string;
  displayValueISO: string;
  value: string;
};

type EventInfo = {
  customInfo: {description: string; map: string};
  displayValue: string;
};

type FieldValue = {
  displayValue: string;
  value: string;
};

export type CalendarEvent = {
  dt_end: EventTime;
  dt_start: EventTime;
  eventInfoField: EventInfo;
  event_end: EventTime;
  event_id: FieldValue;
  event_start: EventTime;
  event_type: FieldValue;
  id: FieldValue;
  isAllDay: {displayValue: string; value: boolean};
  roster_group_id: FieldValue;
  title: FieldValue;
};

export async function fetchCalendar({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}): Promise<CalendarEvent[]> {
  return fetch('https://www.gomotionapp.com/rest/calendar/rawData', {
    method: 'POST',
    headers: {
      'X-Tu-Team': 'pcqsm',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      startDate,
      endDate,
      timezone: 'America/Los_Angeles',
      includeOnDeck: true,
      eventType: 3,
      eventTypes: [3],
    }),
  }).then(response => response.json());
}
