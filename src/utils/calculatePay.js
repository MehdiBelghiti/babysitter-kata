const hourlyRatesByFamily = {
  A: (hour) => (hour < 23 ? 15 : 20),
  B: (hour) => {
    if (hour < 22) return 12;
    if (hour < 24) return 8;
    return 16;
  },
  C: (hour) => (hour < 21 ? 21 : 15),
};

function parseTimeTo24Hour(timeStr) {
  const match = timeStr
    .trim()
    .toUpperCase()
    .match(/^(\d{1,2}):\d{2}(AM|PM)$/);
  if (!match) {
    throw new Error(`Invalid time format: ${timeStr}`);
  }

  let hour = parseInt(match[1], 10);
  const meridian = match[2];

  if (meridian === "PM" && hour < 12) {
    hour += 12; // e.g., 5PM => 17
  } else if (meridian === "AM") {
    if (hour === 12) {
      hour = 24; // midnight
    } else {
      hour += 24; // e.g., 1AM => 25
    }
  }

  return hour;
}

// N.B: This kata is to demonstrate TDD principles & approach only.
// normally, in the first commit, we would add test of outside working hours,
// which expects the error to be thrown.
export function calculatePay(family, startTime, endTime) {
  if (!hourlyRatesByFamily[family]) {
    throw new Error(`Unsupported family: ${family}`);
  }

  const startHour = parseTimeTo24Hour(startTime);
  const endHour = parseTimeTo24Hour(endTime);

  if (startHour < 17 || endHour > 28 || startHour >= endHour) {
    throw new Error(
      `Invalid time range: babysitting must be between 5:00PM and 4:00AM. Received start=${startTime}, end=${endTime}`
    );
  }

  const getRate = hourlyRatesByFamily[family];
  let totalPay = 0;

  for (let hour = startHour; hour < endHour; hour++) {
    totalPay += getRate(hour);
  }

  return totalPay;
}
