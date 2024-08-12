import React, { Dispatch, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerComponent = ({
	deadline,
	setDeadline,
}: {
	deadline: Date | null;
	setDeadline: Dispatch<Date | null>;
}) => {
	// const [startDate, setStartDate] = useState<Date | null>(new Date());
	return (
		<DatePicker
			className="border-solid border-[1px] border-[black] px-2 py-1 rounded-md"
			selected={deadline}
			onChange={(date: Date | null) => setDeadline(date)}
			timeInputLabel="Time:"
			dateFormat="MM/dd/yyyy h:mm aa"
			showTimeInput
		/>
	);
};

export default DatePickerComponent;
