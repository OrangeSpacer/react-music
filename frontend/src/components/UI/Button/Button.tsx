import { IButton } from "./Button.props";
import cn from "classnames";

import styles from "./Button.module.scss";
const Button = ({ func, typeView, children }: IButton) => {
	return (
		<button
			className={cn(styles.button, {
				[styles.circle]: typeView == "circle",
				[styles.rounded]: typeView == "rounded",
			})}
			onClick={func}
		>
			{children}
		</button>
	);
};

export default Button;
