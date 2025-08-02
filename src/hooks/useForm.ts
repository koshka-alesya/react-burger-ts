import { ChangeEvent, useState } from 'react';

type FormValues = {
	[key: string]: unknown;
};

export function useForm<T extends FormValues>(inputValues: T) {
	const [values, setValues] = useState(inputValues);

	const handleChange = (
		event: ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		const { value, name } = event.target;
		setValues({ ...values, [name]: value });
	};
	return { values, handleChange, setValues };
}
