import React from 'react';
import { Dialog, DialogOverlay, DialogContent } from '@reach/dialog';
import '@reach/dialog/styles.css'; // Optional: Style the modal transparent needed.

interface ModalProps {
  isOpen: boolean;
  onClose: () => void; 
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  return (
    <Dialog isOpen={isOpen} onDismiss={onClose}>
      <DialogOverlay className="fixed inset-0 bg-black bg-opacity-10 -z-40" />
      <DialogContent className="fixed inset-0 w-[500px] flex justify-center items-center -z-50 bg-none p-6 rounded shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
        <div className="z-100">
        {children}
        </div>
      </DialogContent>
    </Dialog>
  );
};
