import React from 'react';
import hellfire from '../../images/hellfire.gif';
import styles from './error.module.css';

export const ErrorPage = (): React.JSX.Element => {
	return (
		<div className={styles.error_page}>
			<img className='mb-15' src={hellfire} alt='hell fire' />
			<h1 className='text text_type_main-large mb-4'>
				Упс! Что-то пошло не так
			</h1>
			<p className='text text_type_main-medium text_color_inactive'>
				Попробуйте обновить страницу или вернуться позже.
			</p>
		</div>
	);
};
