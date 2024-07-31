interface ImageProps {
	title?: string;
}

const Image = ({ title }: ImageProps) => {
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
				<clipPath id="clip18_289">
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
				strokeLinejoin="round"
				strokeOpacity="1"
				strokeWidth="2"
				clipPath="url(#clip18_289)"
			>
				<path d="M15.83 2.5c.92 0 1.67.74 1.67 1.66v11.67c0 .92-.75 1.67-1.67 1.67H4.16c-.92 0-1.66-.75-1.66-1.67V4.16c0-.92.74-1.66 1.66-1.66h11.67z" />
				<path d="M7.5 9.16c-.93 0-1.67-.74-1.67-1.67 0-.92.74-1.66 1.67-1.66.92 0 1.66.74 1.66 1.66 0 .93-.74 1.67-1.66 1.67z" />
				<path
					strokeLinecap="round"
					d="M17.5 12.5l-2.58-2.58c-.31-.31-.73-.48-1.17-.48-.45 0-.87.17-1.18.48L5 17.5"
				/>
			</g>
		</svg>
	);
};

export default Image;
