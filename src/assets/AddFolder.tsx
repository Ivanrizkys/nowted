interface AddFolderProps {
	title?: string;
}

const AddFolder = ({ title }: AddFolderProps) => {
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
				<clipPath id="clip18_132">
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
			<g opacity="0.4">
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
					clipPath="url(#clip18_132)"
				>
					<path d="M16.66 16.66c.44 0 .87-.17 1.18-.49.31-.31.49-.73.49-1.17V6.66c0-.44-.18-.86-.49-1.18-.31-.31-.74-.48-1.18-.48h-6.61a1.733 1.733 0 01-1.38-.75l-.68-1A1.667 1.667 0 006.6 2.5H3.33c-.44 0-.87.17-1.18.48a1.7 1.7 0 00-.49 1.18V15c0 .91.75 1.66 1.67 1.66h13.33z" />
					<path strokeLinecap="round" d="M10 8.33v5M7.5 10.83h5" />
				</g>
			</g>
		</svg>
	);
};

export default AddFolder;
