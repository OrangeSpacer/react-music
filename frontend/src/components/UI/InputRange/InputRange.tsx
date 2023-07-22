import { IInputRange } from "./InputRange.interface";

import styles from "./InputRange.module.scss";

const InputRange = ({ maxValue, minValue, onChnage }: IInputRange) => {
	return (
		<input
			min={0}
			value={minValue}
			max={maxValue}
			onChange={onChnage}
			type="range"
			className={styles.range}
		/>
	);
};

export default InputRange;
