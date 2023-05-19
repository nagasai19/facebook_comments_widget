export const CURRENT_DATE_AND_TIME = new Date().toLocaleString();

export const DUMMY_SAMPLE_COMMENTS_SCHEMA = [
  {
    id: Date.now(),
    text: "Initial Comment",
    replies: [],
    isParent: true,
    isEdited: false,
    timestamp: CURRENT_DATE_AND_TIME
  },
  {
    text: "Secondary Comment",
    isParent: true,
    isEdited: false,
    id: Date.now() + 1,
    timestamp: CURRENT_DATE_AND_TIME,
    replies: [
      {
        id: Date.now() + 2,
        text: "Child Comment",
        replies: [],
        isEdited: false,
        timestamp: CURRENT_DATE_AND_TIME
      }
    ]
  }
];

export const deleteComment = (comments, id) => {
  for (let i = 0; i < comments.length; i++) {
    if (comments[i].id === id) {
      comments.splice(i, 1);
      return comments;
    } else if (comments[i].replies.length > 0) {
      const result = deleteComment(comments[i].replies, id);
      if (result) {
        return comments;
      }
    }
  }
};

export const updateComment = (comments, id, updatedText) => {
  for (let i = 0; i < comments.length; i++) {
    if (comments[i].id === id) {
      comments[i].text = updatedText;
      comments[i].timestamp = new Date().toLocaleString();
      comments[i].isEdited = true;
      return comments;
    } else if (comments[i].replies.length > 0) {
      const result = updateComment(comments[i].replies, id, updatedText);
      if (result) {
        return comments;
      }
    }
  }
};

export function formatDateTime(dateTimeStr) {
  const dateTimeParts = dateTimeStr.split(/[\s,]+/);
  const dateParts = dateTimeParts[0].split("/");
  const timeParts = dateTimeParts[1].split(":");
  const dayOfMonth = parseInt(dateParts[0], 10);
  const month = getMonthName(parseInt(dateParts[1], 10));
  const hours = parseInt(timeParts[0], 10);
  const minutes = parseInt(timeParts[1], 10);
  const amPm = hours < 12 ? "A.M" : "P.M";
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;

  return `${dayOfMonth}${getDaySuffix(
    dayOfMonth
  )} ${month}, ${formattedHours}:${padZeroes(minutes)} ${amPm}`;
}

function getMonthName(monthNum) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  return months[monthNum - 1];
}

function getDaySuffix(day) {
  if (day >= 11 && day <= 13) {
    return "th";
  }

  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

function padZeroes(num) {
  return num.toString().padStart(2, "0");
}
