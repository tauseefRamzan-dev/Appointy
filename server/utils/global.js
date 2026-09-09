const getRandomId = () => Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const isValidEmail = email => emailRegex.test(email)

const generateSKU = (category, title) => {
  const catPrefix = category.substring(0, 3).toUpperCase(); 
  const titlePrefix = title.replace(/[^a-zA-Z0-9]/g, "").substring(0, 3).toUpperCase();
  const randomCode = Math.floor(1000 + Math.random() * 9000); 

  return `${catPrefix}-${titlePrefix}-${randomCode}`;
};

const isAdmin = (user) => user?.role === "admin";

  

module.exports = { getRandomId, isValidEmail,isAdmin }