
export const maskNumber = (phone: string) => {
    return phone.replace(/(\d{3})\d{4}(\d{3})$/, "$1****$2");
  };