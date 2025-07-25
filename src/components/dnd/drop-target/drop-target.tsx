import React from 'react';
import styles from './drop-target.module.css';
import { useDrop } from 'react-dnd';
import { TIngredient } from '@/utils/types';

interface DropTargetProps {
	children: React.ReactNode;
	onDropHandler: (item: unknown) => void;
	accept: string;
}

export const DropTarget = ({
	children,
	onDropHandler,
	accept,
}: DropTargetProps): React.JSX.Element => {
	const [{ isHover }, dropTarget] = useDrop({
		accept,
		drop(item: TIngredient) {
			onDropHandler(item);
		},
		collect: (monitor) => ({
			isHover: monitor.isOver(),
		}),
	});

	return (
		<div
			ref={dropTarget}
			className={`${styles.target} ${isHover ? styles.highlighted : ''}`}>
			{children}
		</div>
	);
};
