import styles from './loader.module.css';

const Loader = () => (
	<div className={styles.loader_overlay}>
		<div className={styles.loader}></div>
	</div>
);

export default Loader;
