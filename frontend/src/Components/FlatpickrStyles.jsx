export const customFlatpickrStyles = `
/* Overall calendar appearance */
.flatpickr-calendar {
  @apply shadow-lg rounded-lg border border-gray-300 font-sans max-w-xs p-2;
}

/* Month container styling */
.flatpickr-months {
  @apply rounded-t-lg mb-2 text-center;
}

.flatpickr-month {
  @apply h-6 flex items-center justify-center;
}

/* Month/year selection buttons */
.flatpickr-current-month {
  @apply flex items-right justify-between h-6 w-full relative px-4;
}

/* Month selection */
.flatpickr-current-month .flatpickr-monthDropdown-months {
  @apply border-none font-semibold text-lg text-gray-800 ml-auto text-right !important;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: none;
  width: auto !important;
  padding-right: 0 !important;
}

/* Year to the left */
.flatpickr-current-month input.cur-year {
  @apply border-none font-semibold text-lg text-gray-800 mr-auto text-left;
  width: auto !important;
  padding-left: 0 !important;
}

/* Hide month dropdown arrow */
.flatpickr-current-month .flatpickr-monthDropdown-months::-ms-expand {
  display: none;
}

/* Hide year up/down arrows */
.numInputWrapper span.arrowUp,
.numInputWrapper span.arrowDown {
  display: none !important;
}

/* Navigation arrows */
.flatpickr-months .flatpickr-prev-month,
.flatpickr-months .flatpickr-next-month {
  @apply h-8 w-8 m-2 p-0 flex items-center justify-center rounded-md transition duration-200;
}

.flatpickr-months .flatpickr-prev-month:hover,
.flatpickr-months .flatpickr-next-month:hover {
  @apply bg-gray-200;
}

.flatpickr-months .flatpickr-prev-month svg,
.flatpickr-months .flatpickr-next-month svg {
  @apply w-4 h-4;
}

/* Selected day styling */
.flatpickr-day.selected,
.flatpickr-day.startRange,
.flatpickr-day.endRange {
  @apply bg-indigo-500 border-indigo-500 text-white;
}

.flatpickr-day.selected:hover {
  @apply bg-indigo-600 border-indigo-600;
}

/* Time container and inputs */
.flatpickr-time {
  @apply h-10 border-t border-gray-300 mt-2 rounded-b-lg;
}

.flatpickr-time .numInputWrapper {
  @apply h-10 flex-1;
}

.flatpickr-time .numInputWrapper input {
  @apply text-base font-medium text-gray-700 bg-transparent text-center;
}

/* Time separator hiden */
.flatpickr-time .flatpickr-time-separator {
  visibility: hidden !important;
  width: 2px !important;
  padding: 0 !important;
  margin: 0 !important;
}

/* Today indicator */
.flatpickr-day.today {
  @apply border-gray-300 font-bold;
}

.flatpickr-day.today:hover {
  @apply bg-gray-100 border-gray-300;
}

/* Animation for calendar */
.flatpickr-calendar.animate.open {
  animation: fpFadeInDown 200ms ease-out;
}

@keyframes fpFadeInDown {
  from {
    opacity: 0;
    transform: translate3d(0, -10px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
`;