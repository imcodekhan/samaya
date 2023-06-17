export const STATUS = {
  PENDING: "Pending",
  ARCHIVED: "Archived",
  SKIPPED: "Skipped",
  COMPLETED: "Completed",
  SCHEDULED: "Scheduled",
};

export const FILTER_OPTIONS = [
  { value: STATUS.PENDING, label: STATUS.PENDING },
  { value: STATUS.SCHEDULED, label: STATUS.SCHEDULED },
  { value: STATUS.COMPLETED, label: STATUS.COMPLETED },
  { value: STATUS.ARCHIVED, label: STATUS.ARCHIVED },
  { value: STATUS.SKIPPED, label: STATUS.SKIPPED },
];
