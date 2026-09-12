## Features

- Multiple time-zone rows with live seconds.
- 48-hour horizontal comparison grid.
- Hover an hour tile to compare the same instant across all locations.
- Click an hour tile to keep it selected.
- Add, remove, reorder, and set a home location.
- Add a multiline description or note of up to 100 characters for each selected time zone; each row expands automatically as notes wrap or gain line breaks.
- Search countries, standard time names, cities, and abbreviations such as `India`, `India Standard Time`, `IST`, `Pakistan Standard Time`, `PKT`, `Australian Western Standard Time`, `AWST`, `Central Time (US)`, `CST/CDT`, `Central European Time`, and `CET/CEST`.
- Toggle 12-hour and 24-hour display.
- Toggle between light and dark themes.
- Open the ReadMe PDF from a relative `README.pdf` link, so it works locally and after GitHub Pages deployment.
- Sort locations by UTC offset.
- Save settings in browser local storage.
- Copy a shareable setup link using the URL hash, including selected time zones, notes, and display settings.
- Central European Time uses the browser's IANA time-zone data (`Europe/Copenhagen`) so it dynamically changes between `CET` and `CEST` depending on the season.
- Shows the current year's exact CET/CEST change dates and transition time before the clock board, with the start, resume, and next-change details on separate lines.
- Improves dark-theme readability on yellow daytime and workday hour tiles.

## Behavior

The app uses the browser's built-in `Intl.DateTimeFormat` and IANA time-zone database. That means daylight saving time and half-hour offsets are handled by the browser without downloading scripts or data files.
