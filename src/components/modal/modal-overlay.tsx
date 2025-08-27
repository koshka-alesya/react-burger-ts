import React from 'react';
import styles from './modal.module.css';

interface ModalOverlayProps {
	children: React.ReactNode;
	onClose: () => void;
	isClosing?: boolean;
}

export const ModalOverlay = ({
	children,
	onClose,
	isClosing = false,
}: ModalOverlayProps): React.JSX.Element => {
	return (
		<div
			className={`${styles.modal_overlay} ${isClosing ? styles.closing : ''}`}
			onClick={onClose}>
			<div onClick={(e) => e.stopPropagation()}>{children}</div>
		</div>
	);
};
