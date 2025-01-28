import React, { createContext, useContext, useState } from 'react';
import AlertTypes from '../enum/AlertTypes';

export const AlertContext = createContext();
export const useAlert = () => useContext(AlertContext);

export function AlertProvider({children}){
    const [isVisible, setIsVisible] = useState(false);
    const [alertType, setAlertType] = useState(AlertTypes.SUCCESS);
    const [alertMessage, setAlertMessage] = useState('');

    const showAlert = (message, type) => {
        setAlertType(type);
        setAlertMessage(message);    
        setIsVisible(true);
    };

    const handleSuccess = (message) => {
        showAlert(message, AlertTypes.SUCCESS);
    }

    const handleError = (message) => {
        showAlert(message, AlertTypes.ERROR);
    }

    const handleInfo = (message) => {
        showAlert(message, AlertTypes.INFO);
    }

    return(
        <AlertContext.Provider value={{ isVisible, setIsVisible, handleSuccess, handleError, handleInfo, setAlertType, setAlertType, alertMessage, alertType }}>
            {children}
        </AlertContext.Provider>
    );
};

