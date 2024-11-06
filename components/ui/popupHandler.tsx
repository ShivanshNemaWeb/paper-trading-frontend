'use client'
import React, { useState } from 'react';
import CommandMenu from '@/components/ui/command-menu';

const PopupHandler = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const togglePopup = () => {
        setIsPopupOpen(prevState => !prevState);
    };

    return (
        <>



            <CommandMenu />

        </>
    );
};

export default PopupHandler;
