import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ModalOverlay } from './modal-overlay';
import styles from './modal.module.css';

const modalRoot = document.getElementById('react-modals');

if (!modalRoot) {
	throw new Error("node react-modals doesn't exist");
}

interface ModalProps {
	children: React.ReactNode;
	header?: string | null;
	onClose: () => void;
}

export const Modal = ({
	children,
	header,
	onClose,
}: ModalProps): React.JSX.Element => {
	const [isClosing, setIsClosing] = useState(false);

	const handleClose = () => {
		setIsClosing(true);
		setTimeout(() => {
			onClose();
		}, 300);
	};

	useEffect(() => {
		const handleEsc = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				handleClose();
			}
		};

		window.addEventListener('keydown', handleEsc);
		return () => window.removeEventListener('keydown', handleEsc);
	}, [onClose]);

	return createPortal(
		<ModalOverlay onClose={handleClose} isClosing={isClosing}>
			<div
				className={`${styles.modal} p-10 ${isClosing ? styles.closing : ''}`}>
				<div className={styles.header}>
					<div className='text text_type_main-large'>{header}</div>
					<div onClick={handleClose} className={styles.close_icon}>
						<CloseIcon type='primary' />
					</div>
				</div>
				{children}
			</div>
		</ModalOverlay>,
		modalRoot
	);
};
