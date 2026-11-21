/**
 * Public Business Information & Configuration
 * Supports environment variable overrides via VITE_ prefixed variables.
 */

export const BUSINESS_CONFIG = Object.freeze({
  BUSINESS_NAME: import.meta.env.VITE_BUSINESS_NAME || "Maha Licence Assist",
  TAGLINE: "Driving Licence Registration Assistance in Maharashtra",
  PHONE_NUMBER: import.meta.env.VITE_PHONE_NUMBER || "+91 88579 75661",
  RAW_PHONE_NUMBER: import.meta.env.VITE_RAW_PHONE_NUMBER || "8857975661",
  WHATSAPP_NUMBER: import.meta.env.VITE_WHATSAPP_NUMBER || "918857975661",
  EMAIL: import.meta.env.VITE_CONTACT_EMAIL || "apexsports443@gmail.com",
  SERVICE_AREA: import.meta.env.VITE_SERVICE_AREA || "Maharashtra (Mumbai, Pune, Nagpur, Nashik, Thane & all districts)",
  BUSINESS_HOURS: "Monday - Saturday: 9:00 AM - 7:00 PM",
  ADDRESS: "Serving applicants across all districts in Maharashtra, India"
});
