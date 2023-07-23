import { TitleProps } from "./Title.props";

import styles from "./Title.module.scss";

const Title = ({ text }: TitleProps) => {
	return <h2 className={styles.title}>{text}</h2>;
};

export default Title;
