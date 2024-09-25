interface GoogleFillProps {
	title?: string;
}

const GoogleFill = ({ title }: GoogleFillProps) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="32"
			height="32"
			viewBox="0 0 256 256"
		>
			<title>{title}</title>
			<path
				fill="currentColor"
				strokeMiterlimit="10"
				d="M16.004 14.063v4.203h5.988c-.781 2.547-2.91 4.37-5.988 4.37A6.638 6.638 0 019.367 16a6.636 6.636 0 016.637-6.637c1.648 0 3.152.606 4.312 1.602l3.094-3.098A10.958 10.958 0 0016.004 5C9.926 5 5 9.926 5 16s4.926 11 11.004 11c9.234 0 11.273-8.637 10.367-12.922z"
				fontFamily="none"
				fontSize="none"
				fontWeight="none"
				textAnchor="none"
				transform="scale(8)"
			/>
		</svg>
	);
};

export default GoogleFill;
