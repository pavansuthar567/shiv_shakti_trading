// export const skills = [
//   {
//     label: "Poster/Graphic Design",
//     value: "Poster/Graphic Design",
//   },
//   {
//     label: "Video Editing/Production",
//     value: "Video Editing/Production",
//   },
//   {
//     label: "Social Media Management",
//     value: "Social Media Management",
//   },
//   {
//     label: "Event Coordination",
//     value: "Event Coordination",
//   },
//   {
//     label: "Teaching or Mentoring",
//     value: "Teaching or Mentoring",
//   },
//   {
//     label: "Content writer",
//     value: "Content writer",
//   },
// ];

// export const roles = [
//   {
//     label: "Team Member",
//     value: "Team Member",
//   },
//   {
//     label: "Volunteer",
//     value: "Volunteer",
//   },
// ];

// export const eventStatuses = [
//   {
//     label: "Upcoming",
//     value: "Upcoming",
//   },
//   {
//     label: "Completed",
//     value: "Completed",
//   },
//   {
//     label: "Cancelled",
//     value: "Cancelled",
//   },
// ];

// export const perPageCountOptions = [
//   {
//     label: "4",
//     value: 4,
//   },
//   {
//     label: "12",
//     value: 12,
//   },
//   {
//     label: "24",
//     value: 24,
//   },
//   {
//     label: "48",
//     value: 48,
//   },
// ];

// export const faqsCategories = [
//   {
//     label: "General",
//     value: "General",
//   },
//   {
//     label: "Donations",
//     value: "Donations",
//   },
//   {
//     label: "Volunteering",
//     value: "Volunteering",
//   },
// ];

// export const blogCategories = [
//   {
//     label: "Education",
//     value: "Education",
//   },
//   {
//     label: "Healthcare",
//     value: "Healthcare",
//   },
//   {
//     label: "Environment",
//     value: "Environment",
//   },
//   {
//     label: "Women Empowerment",
//     value: "Women Empowerment",
//   },
//   {
//     label: "Child Welfare",
//     value: "Child Welfare",
//   },
//   {
//     label: "Community Development",
//     value: "Community Development",
//   },
//   {
//     label: "Disaster Relief",
//     value: "Disaster Relief",
//   },
//   {
//     label: "Human Rights",
//     value: "Human Rights",
//   },
//   {
//     label: "Animal Welfare",
//     value: "Animal Welfare",
//   },
//   {
//     label: "Sustainability",
//     value: "Sustainability",
//   },
// ];

// export const ITEM_HEIGHT = 48;
// export const ITEM_PADDING_TOP = 8;

// export const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

// const homeImageKeys = ["whyChooseThumb1", "whyChooseThumb2", "togetherBg"];
// const aboutUsImageKeys = ["empowerCommunities", "supportTheNextInitiative"];
// const pageTitleBgKeys = [
//   "about",
//   "teamMembers",
//   "event",
//   "gallery",
//   "faq",
//   "blog",
//   "contact",
//   "donate",
//   "volunteer",
// ];

// export const dynamicImageKeys = {
//   homeImageKeys,
//   aboutUsImageKeys,
//   pageTitleBgKeys,
// };

// export const fabricLabels = {
//   cotton: "Cotton",
//   lycra: "Lycra",
//   polyester: "Polyester",
//   wool: "Wool",
//   "swiss cotton": "Swiss Cotton",
// };

// export const statusColors = {
//   pending: "text-yellow-600",
//   processing: "text-blue-600",
//   delivered: "text-green-600",
//   cancelled: "text-red-600",
// };

// export const statuses = {
//   pending: "Pending",
//   processing: "Processing",
//   delivered: "Delivered",
//   cancelled: "Cancelled",
// };

type Option<T = string> = {
  label: string;
  value: T;
};

export const skills: Option[] = [
  { label: "Poster/Graphic Design", value: "Poster/Graphic Design" },
  { label: "Video Editing/Production", value: "Video Editing/Production" },
  { label: "Social Media Management", value: "Social Media Management" },
  { label: "Event Coordination", value: "Event Coordination" },
  { label: "Teaching or Mentoring", value: "Teaching or Mentoring" },
  { label: "Content writer", value: "Content writer" },
];

export const roles: Option[] = [
  { label: "Team Member", value: "Team Member" },
  { label: "Volunteer", value: "Volunteer" },
];

export const eventStatuses: Option[] = [
  { label: "Upcoming", value: "Upcoming" },
  { label: "Completed", value: "Completed" },
  { label: "Cancelled", value: "Cancelled" },
];

export const perPageCountOptions: Option<number>[] = [
  { label: "4", value: 4 },
  { label: "12", value: 12 },
  { label: "24", value: 24 },
  { label: "48", value: 48 },
];

export const faqsCategories: Option[] = [
  { label: "General", value: "General" },
  { label: "Donations", value: "Donations" },
  { label: "Volunteering", value: "Volunteering" },
];

export const blogCategories: Option[] = [
  { label: "Education", value: "Education" },
  { label: "Healthcare", value: "Healthcare" },
  { label: "Environment", value: "Environment" },
  { label: "Women Empowerment", value: "Women Empowerment" },
  { label: "Child Welfare", value: "Child Welfare" },
  { label: "Community Development", value: "Community Development" },
  { label: "Disaster Relief", value: "Disaster Relief" },
  { label: "Human Rights", value: "Human Rights" },
  { label: "Animal Welfare", value: "Animal Welfare" },
  { label: "Sustainability", value: "Sustainability" },
];

export const ITEM_HEIGHT = 48;
export const ITEM_PADDING_TOP = 8;

export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

type ImageKeyGroups = {
  homeImageKeys: string[];
  aboutUsImageKeys: string[];
  pageTitleBgKeys: string[];
};

const homeImageKeys = ["whyChooseThumb1", "whyChooseThumb2", "togetherBg"];
const aboutUsImageKeys = ["empowerCommunities", "supportTheNextInitiative"];
const pageTitleBgKeys = [
  "about",
  "teamMembers",
  "event",
  "gallery",
  "faq",
  "blog",
  "contact",
  "donate",
  "volunteer",
];

export const dynamicImageKeys: ImageKeyGroups = {
  homeImageKeys,
  aboutUsImageKeys,
  pageTitleBgKeys,
};

export const fabricLabels: Record<string, string> = {
  cotton: "Cotton",
  lycra: "Lycra",
  polyester: "Polyester",
  wool: "Wool",
  "swiss cotton": "Swiss Cotton",
};

export const statusColors: Record<string, string> = {
  pending: "text-yellow-600",
  processing: "text-blue-600",
  delivered: "text-green-600",
  cancelled: "text-red-600",
};

export const statuses: Record<string, string> = {
  pending: "Pending",
  processing: "Processing",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export enum Statuses {
  Pending = "pending",
  Processing = "processing",
  Delivered = "delivered",
  Cancelled = "cancelled",
}
