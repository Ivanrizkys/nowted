interface LinkProps {
	title?: string;
}

const Link = ({ title }: LinkProps) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="20"
			fill="none"
			viewBox="0 0 20 20"
		>
			<title>{title}</title>
			<defs>
				<clipPath id="clip18_304">
					<rect
						width="19"
						height="19"
						fill="currentColor"
						fillOpacity="0"
						rx="-0.5"
						transform="translate(.5 .5)"
					/>
				</clipPath>
			</defs>
			<rect
				width="19"
				height="19"
				fill="currentColor"
				fillOpacity="0"
				rx="-0.5"
				transform="translate(.5 .5)"
			/>
			<g
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeOpacity="1"
				strokeWidth="2"
				clipPath="url(#clip18_304)"
			>
				<path d="M8.33 10.83c.36.48.81.87 1.34 1.16.52.29 1.1.46 1.7.5.59.04 1.19-.04 1.75-.25s1.07-.54 1.49-.96l2.5-2.5a4.17 4.17 0 001.17-2.93 4.18 4.18 0 00-1.22-2.91 4.137 4.137 0 00-2.91-1.22 4.17 4.17 0 00-2.93 1.17L9.79 4.31" />
				<path d="M11.66 9.16c-.36-.48-.81-.87-1.34-1.16-.52-.29-1.1-.46-1.7-.5-.59-.04-1.19.04-1.75.25s-1.07.54-1.49.96l-2.5 2.5a4.161 4.161 0 00.05 5.84c.77.78 1.82 1.21 2.91 1.22a4.17 4.17 0 002.93-1.17l1.43-1.42" />
			</g>
		</svg>
	);
};

export default Link;
