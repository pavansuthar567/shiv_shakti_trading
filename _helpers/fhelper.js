// import { TableCell, TableRow } from '@mui/material';
import moment from "moment";
// import Iconify from "src/components/iconify";
// import Label from "src/components/label";
// import { authenticationService } from '../_services';
// import navConfig from "src/layouts/dashboard/config-navigation";

const getCurrentUser = () => {
  const currentUserJson = localStorage.getItem("adminCurrentUser");
  const currentUser = JSON.parse(currentUserJson);
  return currentUser;
};

const isUserLoggedIn = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (isLoggedIn === "true") return true;
  else if (isLoggedIn === "false") return false;
  return null;
};

const getUserDetails = () => {
  if (typeof window === "undefined") return null; // Ensure it's only accessed in the browser

  const currentUserJson = localStorage.getItem("userDetails");
  if (!currentUserJson) return null;

  const currentUser = JSON.parse(currentUserJson);
  return currentUser;
};

const getToken = () => {
  const user = getUserDetails();
  if (user?.token) return user?.token;
  return null;
};

const getVariationsArray = (variaionsOfArray, customizations) => {
  return variaionsOfArray.map((variItem) => {
    return {
      variationId: variItem.variationId,
      variationName: customizations.customizationType.find(
        (x) => x.id === variItem.variationId,
      )?.title,
      variationTypes: variItem.variationTypes.map((variTypeItem) => {
        const findedCustomizationType =
          customizations.customizationSubType.find(
            (x) => x.id === variTypeItem.variationTypeId,
          );
        return {
          variationTypeId: variTypeItem.variationTypeId,
          variationTypeName: findedCustomizationType?.title,
        };
      }),
    };
  });
};

const getRandomValue = () => {
  return Math.random().toString(36).substring(7);
};

function sortArrays(arr1, arr2) {
  const sortFunc = (a, b) => {
    if (a.variationId < b.variationId) return -1;
    if (a.variationId > b.variationId) return 1;
    if (a.variationTypeId < b.variationTypeId) return -1;
    if (a.variationTypeId > b.variationTypeId) return 1;
    return 0;
  };

  arr1.sort(sortFunc);
  arr2.sort(sortFunc);
}

const areArraysEqual = (arr1, arr2) => {
  if (arr1.length !== arr2.length) {
    return false;
  }

  sortArrays(arr1, arr2);

  for (let i = 0; i < arr1.length; i++) {
    if (
      arr1[i].variationId !== arr2[i].variationId ||
      arr1[i].variationTypeId !== arr2[i].variationTypeId
    ) {
      return false;
    }
  }

  return true;
};

const getPriceQty = (arrayOfCombinations, selectedVariations) => {
  const array1 = selectedVariations.map((item) => {
    return {
      variationId: item.variationId,
      variationTypeId: item.variationTypeId,
    };
  });
  const findedCombination = arrayOfCombinations?.find((combinationsItem) => {
    const array2 = combinationsItem.combination;
    return areArraysEqual(array1, array2);
  });
  return {
    price: findedCombination?.price ? findedCombination?.price : 0,
    quantity: findedCombination?.quantity ? findedCombination?.quantity : 0,
  };
};

const getMinPriceVariCombo = (arrayOfCombinations, key = "price") => {
  if (arrayOfCombinations?.length) {
    const sortedArray = arrayOfCombinations.sort((a, b) => a[key] - b[key]);
    return sortedArray[0];
  }
  return;
};

const getSellingPrice = (price, discount = 0) => {
  const cprice = Number(price);
  const cdiscount = Number(discount);
  const sellingPrice = cprice - (cprice * cdiscount) / 100;
  return Number(fhelper.toFixedNumber(sellingPrice));
};

const getStatusBg = (status) => {
  const statusMap = {
    failed: "error",
    rejected: "pink",
    delivered: "info",
    cancelled: "error",
    success: "success",
    pending: "warning",
    refunded: "default",
    approved: "success",
    received: "default",
    confirmed: "success",
    shipped: "secondary",
    failed_refund: "pink",
    pending_refund: "info",
    cancelled_refund: "error",
    refund_initialization_failed: "secondary",
  };

  return statusMap[status] || "default";
};

const getWeeksRange = () => {
  const today = new Date();
  const currentDate = moment();
  const oneWeekAgo = currentDate.subtract(1, "weeks");
  const formattedDate = oneWeekAgo.format("YYYY-MM-DD"); // formatted date for patch value
  const patchedStartDate = new Date(formattedDate);

  const patchedEndDate = today;
  return { startDate: patchedStartDate, endDate: patchedEndDate };
};

const calculatePreviousDates = () => {
  const currentDate = moment();

  // Calculate 1 week ago
  const oneWeekAgo = currentDate.clone().subtract(1, "weeks");

  // Calculate 1 month ago
  const oneMonthAgo = currentDate.clone().subtract(1, "months");

  // Calculate 3 months ago
  const threeMonthsAgo = currentDate.clone().subtract(3, "months");

  // Calculate 6 months ago
  const sixMonthsAgo = currentDate.clone().subtract(6, "months");

  // Calculate 1 year ago
  const oneYearAgo = currentDate.clone().subtract(1, "years");

  return {
    oneWeekAgo,
    oneMonthAgo,
    threeMonthsAgo,
    sixMonthsAgo,
    oneYearAgo,
  };
};

const formatAndDisplayDate = (date) => {
  const d = new Date(date);
  const month = (d.getMonth() + 1).toString().padStart(2, "0");
  const day = d.getDate().toString().padStart(2, "0");
  const year = d.getFullYear();

  if (month && day && year) return `${month}-${day}-${year}`;
  return "INVALID";
};

const { oneWeekAgo, oneMonthAgo, threeMonthsAgo, sixMonthsAgo, oneYearAgo } =
  calculatePreviousDates();

const getTypeWiseDate = (type) => {
  switch (type) {
    case "1W":
      return fhelper.formatAndDisplayDate(oneWeekAgo);
    case "1M":
      return fhelper.formatAndDisplayDate(oneMonthAgo);
    case "3M":
      return fhelper.formatAndDisplayDate(threeMonthsAgo);
    case "6M":
      return fhelper.formatAndDisplayDate(sixMonthsAgo);
    case "1Y":
      return fhelper.formatAndDisplayDate(oneYearAgo);
    default:
      return fhelper.formatAndDisplayDate(oneWeekAgo);
  }
};

const formatAmount = (amount) => {
  amount = Number(amount);
  if (amount) {
    return `$ ${amount.toFixed(2)}`;
  }
  return "N/A";
};

const toFixedNumber = (amount) => {
  amount = amount ? amount : 0;
  return Number(amount).toFixed(2);
};

const removeLastSegment = (url) => {
  const segments = url.split("/");
  const desiredSubstring = segments.slice(0, segments.length - 1).join("/");
  return desiredSubstring;
};

const isValidKeyName = (arrayOfObjects, keyName) =>
  arrayOfObjects.every((object) => object.hasOwnProperty(keyName));

const sortByField = (array, key = "createdDate", direction = 1) => {
  if (![1, -1].includes(direction)) return array;
  return array.sort((a, b) => {
    if (a[key] < b[key]) return -1 * direction;
    if (a[key] > b[key]) return 1 * direction;
    return 0;
  });
};

// const getAllPagesList = () => {
//   return navConfig?.map((item) => ({
//     pageId: item.pageId,
//     title: item.title,
//   }));
// };

const checkUserPermission = (userPermissions, pageId) => {
  return userPermissions?.find((permission) => permission.pageId === pageId);
};

// const permissionWiseRedirect = (adminWisePermisisons) => {
//   if (adminWisePermisisons?.length) {
//     const pagesList = fhelper.getAllPagesList();
//     const dashboardPermission = adminWisePermisisons.find(
//       (permission) => permission.pageId === 'dashboard'
//     );

//     if (dashboardPermission) {
//       const dashboardPage = navConfig.find((page) => page.pageId === 'dashboard');
//       if (dashboardPage) {
//         return dashboardPage.path;
//       }
//     }

//     const matchedPermission = adminWisePermisisons.find((permission) =>
//       pagesList.find((page) => page.pageId === permission.pageId)
//     );
//     if (matchedPermission) {
//       const matchedPage = navConfig.find((page) => page.pageId === matchedPermission.pageId);
//       if (matchedPage) {
//         return matchedPage.path;
//       } else {
//         authenticationService.logOut();
//         return;
//       }
//     } else {
//       authenticationService.logOut();
//       return;
//     }
//   } else {
//     return false;
//   }
// };

const isValidNumber = (value) => {
  return typeof value === "number" && !isNaN(value);
};

const calculateRefundAmount = (list) => {
  const total = list?.reduce((accumulator, object) => {
    return accumulator + object.unitAmount;
  }, 0);
  const serviceFee = Number(total) * 0.035; //3.5%
  return Number(total) - serviceFee;
};

const calculateServiceFee = (list) => {
  const total = list?.reduce((accumulator, object) => {
    return accumulator + object.unitAmount;
  }, 0);
  return Number(total) * 0.035; //3.5%
};

export const currentYear = new Date().getFullYear();

export const lastFiveYears = () => {
  const last5Years = [{ label: "All", value: 0 }];
  for (let i = currentYear; i > currentYear - 5; i--) {
    last5Years.push({ label: i, value: i });
  }
  return last5Years;
};

const capitalWords = (str) => {
  if (!str || typeof str !== "string") return;

  const words = str?.split(" ");

  for (let i = 0; i < words?.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }

  return words?.join(" ");
};

const stringReplacedWithUnderScore = (string) => {
  return string?.split(" ")?.join("_");
};
const stringReplacedWithSpace = (string) => {
  return string?.split("_")?.join(" ");
};
const getRandomNumberLimitedDigits = () => {
  const min = 10; // Minimum 2-digit number
  const max = 99999; // Maximum 5-digit number
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const toTitleCase = (str) => {
  return str
    .replace(/([A-Z])/g, " $1") // Add space before uppercase letters
    .trim() // Remove leading/trailing spaces
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

function getHeadersFromObjects(objects, includeKeys = []) {
  // Create a Set to store unique keys
  const headersSet = new Set();

  // Iterate through each object and collect keys
  objects.forEach((obj) => {
    Object.keys(obj).forEach((key) => {
      // Check if includeKeys is provided and if the key is included
      if (includeKeys.length === 0 || includeKeys.includes(key)) {
        headersSet.add(toTitleCase(key)); // Convert key to title case and add to set
      }
    });
  });

  // Convert Set to Array and return
  return Array.from(headersSet);
}

// const renderTableBody = (data) => {
//   return data?.map((member, i) => (
//     <>
//       {Object.keys(member).map((key, index) => {
//         let cellContent;

//         // Get the value for the current key
//         const value = member[key];

//         console.log('value', value);
//         console.log('type', typeof value);
//         // Determine the data type and set cellContent accordingly using if-else
//         if (typeof value === 'string') {
//           cellContent = value || 'N/A'; // Handle empty strings
//         } else if (typeof value === 'number') {
//           cellContent = value.toString(); // Convert numbers to string
//         } else if (typeof value === 'boolean') {
//           cellContent = value ? 'Yes' : 'No'; // Format boolean values
//         } else if (Array.isArray(value)) {
//           // Handle arrays (e.g., skills)
//           cellContent = (
//             <div className="!flex gap-2 flex-nowrap min-w-fit h-fit">
//               {value?.map((item, skillIndex) => (
//                 <Label sx={{ m: 0 }} key={`skill-${item}-${skillIndex}`}>
//                   {item}
//                 </Label>
//               ))}
//             </div>
//           );
//         } else if (value instanceof Date) {
//           // Handle date objects
//           cellContent = fhelper.formatAndDisplayDate(value);
//         } else if (typeof value === 'object' && value !== null) {
//           // Handle objects (e.g., address, emergencyContact)
//           cellContent = `${value?.street || ''}, ${value?.city || ''}, ${value?.state || ''}, ${value?.zipCode || ''}`;
//         } else {
//           // Handle unexpected types
//           cellContent = 'N/A';
//         }

//         return (
//           <TableCell
//             key={`cell-${i}-${index}`}
//             className={Array.isArray(value) ? 'flex-nowrap' : 'text-nowrap'}
//           >
//             {cellContent}
//           </TableCell>
//         );
//       })}
//     </>
//   ));
// };

export const fhelper = {
  getCurrentUser,
  isUserLoggedIn,
  getUserDetails,
  getToken,
  getVariationsArray,
  getRandomValue,
  getStatusBg,
  getWeeksRange,
  calculatePreviousDates,
  formatAndDisplayDate,
  getTypeWiseDate,
  lastFiveYears,
  getPriceQty,
  formatAmount,
  areArraysEqual,
  removeLastSegment,
  isValidKeyName,
  sortByField,
  // getAllPagesList,
  checkUserPermission,
  // permissionWiseRedirect,
  isValidNumber,
  toFixedNumber,
  capitalWords,
  calculateRefundAmount,
  calculateServiceFee,
  getSellingPrice,
  getMinPriceVariCombo,
  stringReplacedWithUnderScore,
  stringReplacedWithSpace,
  getRandomNumberLimitedDigits,
  getHeadersFromObjects,
  toTitleCase,
  // renderTableBody,
};
