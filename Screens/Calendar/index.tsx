import {Heading, Pressable, Text} from 'native-base';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {
  Agenda,
  AgendaEntry,
  AgendaSchedule,
  DateData,
} from 'react-native-calendars';
import {CalendarEvent, fetchCalendar} from './fetchCalendar';

const getDisplayTime = (date: Date) =>
  date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});

export function CalendarScreen() {
  const [items, setItems] = React.useState<AgendaSchedule>({});

  return (
    <Agenda
      items={items}
      loadItemsForMonth={day => loadItems(day).then(n => setItems(n))}
      // selected={new Date()}
      renderItem={renderItem}
      renderEmptyDate={renderEmptyDate}
      // rowHasChanged={this.rowHasChanged}
      showClosingKnob={true}
      // markingType={'period'}
      // markedDates={{
      //    '2017-05-08': {textColor: '#43515c'},
      //    '2017-05-09': {textColor: '#43515c'},
      //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
      //    '2017-05-21': {startingDay: true, color: 'blue'},
      //    '2017-05-22': {endingDay: true, color: 'gray'},
      //    '2017-05-24': {startingDay: true, color: 'gray'},
      //    '2017-05-25': {color: 'gray'},
      //    '2017-05-26': {endingDay: true, color: 'gray'}}}
      // monthFormat={'yyyy'}
      // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
      // renderDay={this.renderDay}
      // hideExtraDays={false}
      // showOnlySelectedDayItems
      // reservationsKeyExtractor={this.reservationsKeyExtractor}
    />
  );
}

async function loadItems(day: DateData) {
  const thisDay = new Date(day.timestamp);
  const nextDay = new Date(thisDay);
  nextDay.setDate(thisDay.getDate() + 1);

  const data = await fetchCalendar({
    startDate: thisDay.toISOString(),
    endDate: nextDay.toISOString(),
  }).catch(error => {
    console.log('fetch calendar error', error);
    return [];
  });

  return transform(data);
}

function timeToString(time: number) {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
}

function renderEmptyDate() {
  return <Text>No practice</Text>;
}

function renderItem(event: AgendaEntry) {
  const {title, start, end} = JSON.parse(event.name);

  let bg = 'white';
  if (title.match(/asrc/i)) {
    bg = 'pink.100';
  } else if (title.match(/ghs/i)) {
    bg = 'indigo.100';
  } else if (title.match(/ph/i)) {
    bg = 'green.100';
  }
  return (
    <Pressable bg={bg} p={5} h={100} mt={17} mr={10}>
      <Heading size="md">
        {getDisplayTime(new Date(start))} - {getDisplayTime(new Date(end))}
      </Heading>
      <Text>{title}</Text>
    </Pressable>
  );
}

function transform(events: CalendarEvent[]): AgendaSchedule {
  return events
    .sort((a, b) => {
      const aTime = new Date(a.event_start.value);
      const bTime = new Date(b.event_start.value);
      return aTime.getHours() - bTime.getHours();
    })
    .reduce((acc, event) => {
      const date = new Date(event.event_start.value);
      const day = timeToString(date.getTime());
      const entry: AgendaEntry = {
        // AgendaEntry doesn't allow for custom data yet, so we have to stringify it. https://github.com/wix/react-native-calendars/issues/1846
        name: JSON.stringify({
          title: event.title.displayValue,
          location: event.eventInfoField.customInfo.map,
          start: event.event_start.value,
          end: event.event_end.value,
        }),
        height: 50,
        day,
      };
      const dayEvents = acc[day] || [];
      return {
        ...acc,
        [day]: [...dayEvents, entry],
      };
    }, {});
}
