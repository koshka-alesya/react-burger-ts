import React, { ReactNode, useCallback, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

type TDragItemProps = {
	id: string | number;
	index: number;
	children: ReactNode;
	moveItem: (dragIndex: number, hoverIndex: number) => void;
	className?: string;
};

type TDragItem = {
	type: 'drag-item';
	id: string | number;
	index: number;
	node: HTMLLIElement | null;
};

export const DragItem = ({
	id,
	index,
	moveItem,
	children,
	className,
}: TDragItemProps): React.JSX.Element => {
	const ref = useRef<HTMLLIElement>(null);

	const moveItemCallback = useCallback(
		(dragIndex: number, hoverIndex: number) => {
			if (dragIndex !== hoverIndex) {
				moveItem(dragIndex, hoverIndex);
			}
		},
		[moveItem]
	);

	const [, drop] = useDrop({
		accept: 'drag-item',
		hover(item: TDragItem, monitor) {
			if (!ref.current) return;

			const dragIndex = item.index;
			const hoverIndex = index;

			if (dragIndex === hoverIndex) return;

			const hoverBoundingRect = ref.current.getBoundingClientRect();
			const hoverMiddleY =
				(hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

			const clientOffset = monitor.getClientOffset();
			if (clientOffset) {
				const hoverClientY = clientOffset.y - hoverBoundingRect.top;

				if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
				if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

				moveItemCallback(dragIndex, hoverIndex);
				item.index = hoverIndex;
			}
		},
	});

	const [{ isDragging }, drag] = useDrag({
		type: 'drag-item',
		item: { type: 'drag-item', id, index, node: ref.current },
		collect: (monitor) => ({ isDragging: monitor.isDragging() }),
	});

	drag(drop(ref));

	return (
		<li
			ref={ref}
			className={className || ''}
			style={{ opacity: isDragging ? 0 : 1, cursor: 'grab' }}>
			{children}
		</li>
	);
};
