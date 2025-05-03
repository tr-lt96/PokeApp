import { createContext, useContext, useState } from "react";

const MessageContext = createContext({
  message: "",
  severity: "warning",
  setUserAlert: (message, severity) => {},
});

export const MessageProvider = ({ children }) => {
  const [message, setMessage] = useState("");
  // Severity can be "success", "warning", "error"
  const [severity, setSeverity] = useState("warning");

  /**
   * @param {string} message
   * @param {"success" | "warning" | "error"} severity
   */
  const setUserAlert = (message, severity) => {
    setMessage(message);
    setSeverity(severity);

    setTimeout(() => {
      setMessage("");
      setSeverity("");
    }, 5000);
  };
  return (
    <MessageContext.Provider value={{ message, severity, setUserAlert }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessage = () => useContext(MessageContext);
