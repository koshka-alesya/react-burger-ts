import React from 'react';
import styles from './modal.module.css';

interface ModalOverlayProps {
	children: React.ReactNode;
	onClose: () => void;
}

export const ModalOverlay = ({
	children,
	onClose,
}: ModalOverlayProps): React.JSX.Element => {
	return (
		<div className={styles.modal_overlay} onClick={onClose}>
			<div onClick={(e) => e.stopPropagation()}>{children}</div>
		</div>
	);
};
