'use strict';

/**
 * UI strings that are rendered or updated by script.js.
 * Static copy lives in index.html; everything that JavaScript writes into the page
 * (space names, showcase tabs, ARIA labels, viewer labels) comes from here so it can be
 * edited or localised in one place.
 */
window.STRINGS = {
  locale: 'en',

  motion: {
    pause: 'Pause animations',
    resume: 'Resume animations'
  },

  viewer: {
    zoomLabel: caption => `Enlarge: ${caption}`,
    screenAlt: caption => `${caption}. Screenshot of the Pallino app.`
  },

  // Space palettes mirror Pallino's Colors.kt (main, container, background, dark ink).
  spaces: {
    blue: {
      name: 'University', task: 'Send the draft', project: '&Thesis', tag: '#thesis',
      main: '#2f5fd0', container: '#dce6fb', bg: '#f4f7fe', ink: '#14307a'
    },
    orange: {
      name: 'Personal', task: 'Renew the passport', project: '&Home', tag: '#personal',
      main: '#b25400', container: '#fde5cf', bg: '#fff8f2', ink: '#5e2c00'
    },
    pink: {
      name: 'Rotaract', task: 'Book the venue', project: '&Dinner', tag: '#dinner',
      main: '#b3135f', container: '#fadcea', bg: '#fef6fa', ink: '#670a37'
    },
    green: {
      name: 'Projects', task: 'Plan the road trip', project: '&Trip', tag: '#ideas',
      main: '#1b7f3b', container: '#d5f0dc', bg: '#f3fbf5', ink: '#0b4220'
    },
    purple: {
      name: 'Ideas', task: 'Outline the study notes', project: '&Study', tag: '#research',
      main: '#6a3fc8', container: '#e6ddfa', bg: '#f8f5fe', ink: '#341a73'
    }
  },

  // Interactive showcase (the four tabs in "Inside the app").
  screens: {
    capture: {
      number: '01 / Capture',
      title: 'A thought?<br>Catch it on the fly.',
      description: 'Task, note or list: choose how to capture what is on your mind. Type naturally or dictate a task, and let the ideas keep coming.',
      points: [
        'Recognises dates, times, deadlines and duration as you type',
        'Projects (&), tags (#) and reminders (;) in a single sentence',
        'Switch spaces by tapping or swiping the dots'
      ],
      image: 'capture',
      perSpace: true, // real screenshot per space colour: capture-blue.webp, capture-orange.webp…
      caption: 'Capture · dates, priorities, tags and projects recognised as you type'
    },
    tasks: {
      number: '02 / Tasks',
      title: 'Your tasks.<br>Days, projects and subtasks.',
      description: 'An Inbox for undated ideas, then today and the days ahead. Every task carries its space colour, its deadline and its subtasks, indented under the parent.',
      points: [
        'Grouped by day, with an Inbox for tasks without a date',
        'Two levels of subtasks with progress (e.g. 0/3)',
        'Filter by space, priority, project, deadline or status'
      ],
      image: 'tasks',
      caption: 'Tasks · grouped by day, with Inbox, spaces and subtasks'
    },
    notes: {
      number: '03 / Notes',
      title: 'Scattered ideas.<br>Finally together.',
      description: 'Thesis ideas, the dinner menu, documents to renew. Keep your notes in their colourful spaces and find them again instantly with tags.',
      points: [
        'Write in Markdown with highlights and checklists',
        'Organise with coloured spaces, tags, projects and pinned notes',
        'Extract tasks from notes with rules or with local/cloud AI'
      ],
      image: 'notes',
      caption: 'Notes · grid of notes with coloured spaces, tags and pinned notes'
    },
    focus: {
      number: '04 / Focus',
      title: 'Find your rhythm.<br>The rest can wait.',
      description: 'When everything feels important, Focus helps you choose. Tasks are sorted into Do now, Up next and Later, with the reason behind every pick.',
      points: [
        'Priority, deadlines, date and space prompt in a single view',
        'A clear reason under every suggested task',
        'Review today to go through today’s tasks one at a time'
      ],
      image: 'focus',
      caption: 'Focus · tasks ranked by importance, with the reason for each pick'
    }
  }
};
