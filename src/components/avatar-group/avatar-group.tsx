import React from 'react';
import styles from './avatar-group.module.css';

type TAvatarGroup = {
	images: string[];
	maxVisible?: number;
	size?: number;
};

export const AvatarGroup = ({
	images,
	maxVisible = 5,
	size = 64,
}: TAvatarGroup): React.JSX.Element => {
	const extraCount = images.length - maxVisible;
	const visibleImages =
		extraCount > 0 ? images.slice(0, maxVisible).reverse() : images.reverse();

	return (
		<div className={styles.avatar_group}>
			{visibleImages.map((src, index) =>
				index == 0 && extraCount > 0 ? (
					<div
						key={index}
						className={styles.avatar}
						style={{ width: size, height: size }}>
						<img src={src} alt={`avatar-${index}`} />
						<div
							style={{ width: size, height: size }}
							className={`${styles.avatar_extra} text text_type_main-default`}>
							+{extraCount}
						</div>
					</div>
				) : (
					<div
						key={index}
						className={styles.avatar}
						style={{ width: size, height: size }}>
						<img src={src} alt={`avatar-${index}`} />
					</div>
				)
			)}
		</div>
	);
};
