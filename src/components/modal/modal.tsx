import React, { useEffect } from 'react';
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
	useEffect(() => {
		const handleEsc = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose();
			}
		};

		window.addEventListener('keydown', handleEsc);
		return () => window.removeEventListener('keydown', handleEsc);
	}, [onClose]);

	return createPortal(
		<ModalOverlay onClose={onClose}>
			<div className={`${styles.modal} p-10`}>
				<div className={styles.header}>
					<div className='text text_type_main-large'>{header}</div>
					<div onClick={onClose} className={styles.close_icon}>
						<CloseIcon type='primary' />
					</div>
				</div>
				{children}
			</div>
		</ModalOverlay>,
		modalRoot
	);
};
