'use client';

import { createContext, useContext, useState, useEffect } from "react";

// Create a context with default values
const GlobalContext = createContext({
  userId: '',
  isAuthenticated: "false",
  isLang: 'eng', // Add isLang to the context
  setUserId: () => {},
  data: [],
  setData: () => {},
  DisplayName: '',
  UserName: '',
  Role: '',
  PackageId: '',
  setDisplayName: () => {},
  setUserName: () => {},
  setRole: () => {},
  setPackageId: () => {},
  setLang: () => {}, // Add setLang to the context
  logout: () => {}, // Logout function
});

export const GlobalContextProvider = ({ children }) => {
  const [userId, setUserIdState] = useState('');
  const [data, setDataState] = useState([]);
  const [DisplayName, setDisplayNameState] = useState('');
  const [UserName, setUserNameState] = useState('');
  const [Role, setRoleState] = useState('');
  const [PackageId, setPackageIdState] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState("false"); // Correct camel case
  const [isLang, setIsLang] = useState('eng'); // State to manage language preference

  // Function to load data from localStorage when the component mounts
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    const storedData = JSON.parse(localStorage.getItem('data') || '[]');
    const storedDisplayName = localStorage.getItem('DisplayName');
    const storedUserName = localStorage.getItem('UserName');
    const storedRole = localStorage.getItem('Role');
    const storedPackageId = localStorage.getItem('PackageId');
    const storedLang = localStorage.getItem('isLang') || 'eng'; // Load language preference

    if (storedUserId) {
      setUserIdState(storedUserId);
      setIsAuthenticated("true"); // Corrected function
    }
    if (storedData) setDataState(storedData);
    if (storedDisplayName) setDisplayNameState(storedDisplayName);
    if (storedUserName) setUserNameState(storedUserName);
    if (storedRole) setRoleState(storedRole);
    if (storedPackageId) setPackageIdState(storedPackageId);
    setIsLang(storedLang); // Set the loaded language preference
  }, []);

  // Custom setter functions that save data to both state and localStorage
  const setUserId = (value) => {
    setUserIdState(value);
    localStorage.setItem('userId', value);
  };

  const setData = (value) => {
    setDataState(value);
    localStorage.setItem('data', JSON.stringify(value));
  };

  const setDisplayName = (value) => {
    setDisplayNameState(value);
    localStorage.setItem('DisplayName', value);
  };

  const setUserName = (value) => {
    setUserNameState(value);
    setIsAuthenticated("true");
    localStorage.setItem('UserName', value);
  };

  const setRole = (value) => {
    setRoleState(value);
    localStorage.setItem('Role', value);
  };

  const setPackageId = (value) => {
    setPackageIdState(value);
    localStorage.setItem('PackageId', value);
  };

  // Setter for language preference
  const setLang = (value) => {
    setIsLang(value);
    localStorage.setItem('isLang', value); // Save language preference to localStorage
  };

  // Logout function to clear all context state and localStorage
  const logout = () => {
    setUserIdState('');
    setDataState([]);
    setDisplayNameState('');
    setUserNameState('');
    setRoleState('');
    setPackageIdState('');
    setIsLang('eng'); // Reset language to default
    setIsAuthenticated("false"); // Corrected camel case and logic

    // Clear all values from localStorage
    localStorage.removeItem('userId');
    localStorage.removeItem('data');
    localStorage.removeItem('DisplayName');
    localStorage.removeItem('UserName');
    localStorage.removeItem('Role');
    localStorage.removeItem('PackageId');
    localStorage.removeItem('isLang'); // Remove language preference
  };

  return (
    <GlobalContext.Provider
      value={{
        userId,
        isAuthenticated,
        isLang,
        setUserId,
        data,
        setData,
        DisplayName,
        setDisplayName,
        UserName,
        setUserName,
        Role,
        setRole,
        PackageId,
        setPackageId,
        setLang,
        logout, 
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
