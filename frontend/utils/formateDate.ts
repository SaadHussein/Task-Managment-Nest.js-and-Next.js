export const formateDate = (oldFormateDate: string) => {
	const date: Date | null = new Date(oldFormateDate);

	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	const year = date.getFullYear();

	let hours = date.getHours();
	const minutes = date.getMinutes().toString().padStart(2, "0");
	const ampm = hours >= 12 ? "PM" : "AM";

	hours = hours % 12;
	hours = hours ? hours : 12;

	const formattedDate = `${month}/${day}/${year} ${hours}:${minutes} ${ampm}`;

	return formattedDate;
};
