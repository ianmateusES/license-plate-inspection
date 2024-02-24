const validateLicensePlate = (plate: string): boolean => {
  // Regex to validate the old license plate format (AAA-1234 or AAA1A23) and Mercosur format (XXX0X00)
  const regexOldFormat = /^[A-Z]{3}-?\d{4}$|^[A-Z]{3}\d[A-Z]\d{2}$/;
  const regexMercosulFormat = /^[A-Z]{3}\d[A-Z][0-9]{2}$/;

  // Check if the plate matches either format
  if (regexOldFormat.test(plate) || regexMercosulFormat.test(plate)) {
    return true;
  }
  return false;
};

export { validateLicensePlate };
