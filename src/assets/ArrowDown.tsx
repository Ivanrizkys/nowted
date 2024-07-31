interface ArrowDownProps {
	title?: string;
}

const ArrowDown = ({ title }: ArrowDownProps) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="12.008"
			height="7.004"
			fill="none"
			viewBox="0 0 12.008 7.004"
		>
			<title>{title}</title>
			<path
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeOpacity="1"
				strokeWidth="2"
				d="M1 1l5 5 5-5"
			/>
		</svg>
	);
};

export default ArrowDown;
