import React from 'react';
import styles from './drop-target.module.css';
import { useDrop } from 'react-dnd';

interface IDropTargetProps<T> {
	children: React.ReactNode;
	onDropHandler: (item: T) => void;
	accept: string;
}

export const DropTarget = <T,>({
	children,
	onDropHandler,
	accept,
}: IDropTargetProps<T>): React.JSX.Element => {
	const [{ isHover }, dropTarget] = useDrop({
		accept,
		drop(item: T) {
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
