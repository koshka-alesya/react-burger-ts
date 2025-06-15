import React from 'react';
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
	return createPortal(
		<ModalOverlay onClose={onClose}>
			<div className={`${styles.modal} p-10`}>
				<div className={styles.modal__header}>
					<div className='text text_type_main-large'>{header}</div>
					<div
						onKeyDown={() => {}}
						role='button'
						tabIndex={0}
						onClick={onClose}
						className={styles.modal__close}>
						<CloseIcon type='primary' />
					</div>
				</div>
				{children}
			</div>
		</ModalOverlay>,
		modalRoot
	);
};
