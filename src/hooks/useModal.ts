import { useState } from 'react';

export interface UseModal {
  isOpen: boolean;
  toggle: () => void;
}

export const useModal = (): UseModal => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggle = () => {
    const state = !isOpen;
    setIsOpen(state);

    if (state) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  };

  return {
    isOpen,
    toggle
  };
};
