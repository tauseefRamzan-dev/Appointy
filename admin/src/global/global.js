// // export const calculateAge = (dob) => {
// //   if (!dob) return 'N/A';
// //   const birthDate = new Date(dob);
// //   const today = new Date();
// //   let age = today.getFullYear() - birthDate.getFullYear();
// //   const m = today.getMonth() - birthDate.getMonth();
// //   if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
// //     age--;
// //   }
// //   return `${age} yrs`;;
// // };

// export const calculateAge = (dob) => {
//   if (!dob) return null; // Return null or 'N/A' directly if missing
//   const birthDate = new Date(dob);
//   const today = new Date();
//   let age = today.getFullYear() - birthDate.getFullYear();
//   const m = today.getMonth() - birthDate.getMonth();
//   if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
//     age--;
//   }
//   return `${age} yrs`;
// };

export const calculateAge = (dob) => {
  if (!dob) return 'N/A';
  const birthDate = new Date(dob);

  // Check if date is invalid (NaN)
  if (isNaN(birthDate.getTime())) return 'N/A';

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return isNaN(age) ? 'N/A' : `${age} yrs`;
};