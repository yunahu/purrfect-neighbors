export const getInitials = (name) => {
  if (!name) return "";

  const nameArray = name.split(" ");

  if (nameArray.length === 1) {
    return nameArray[0].charAt(0).toUpperCase();
  }

  const firstName = nameArray[0];
  const lastName = nameArray[nameArray.length - 1];

  return firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
};
