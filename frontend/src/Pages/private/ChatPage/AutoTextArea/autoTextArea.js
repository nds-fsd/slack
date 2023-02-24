import React from "react";
import styles from './autoTextArea.module.css';

import TextareaAutosize from 'react-textarea-autosize';

const AutoTextArea = (props) => {
	return (
			<TextareaAutosize
				{...props}
				className={styles.textarea}
			/>
	);
};

export default AutoTextArea;
