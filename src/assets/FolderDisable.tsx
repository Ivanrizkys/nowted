interface FolderDisalbeProps {
	variant: "sm" | "lg";
}

const FolderDisable = ({ variant }: FolderDisalbeProps) => {
	return (
		<>
			{variant === "sm" && (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="18"
					height="18"
					fill="none"
					viewBox="0 0 18 18"
				>
					<title>Folder</title>
					<path
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M3 15h12a1.5 1.5 0 001.5-1.5V6A1.5 1.5 0 0015 4.5H9.053a1.5 1.5 0 01-1.246-.675l-.615-.9a1.5 1.5 0 00-1.245-.675H3a1.5 1.5 0 00-1.5 1.5v9.75c0 .825.675 1.5 1.5 1.5z"
						opacity="0.6"
					/>
				</svg>
			)}
			{variant === "lg" && (
				<svg
					width="20"
					height="20"
					viewBox="0 0 20 20"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<title>Folder Disable</title>
					<path
						d="M3.33335 16.6667H16.6667C17.1087 16.6667 17.5326 16.4911 17.8452 16.1785C18.1578 15.866 18.3334 15.442 18.3334 15V6.66667C18.3334 6.22464 18.1578 5.80072 17.8452 5.48816C17.5326 5.17559 17.1087 5 16.6667 5H10.0584C9.78384 4.99858 9.51393 4.92937 9.2726 4.79853C9.03127 4.66769 8.826 4.47927 8.67502 4.25L7.99169 3.25C7.84071 3.02073 7.63543 2.83231 7.39411 2.70147C7.15278 2.57063 6.88287 2.50142 6.60835 2.5H3.33335C2.89133 2.5 2.4674 2.67559 2.15484 2.98816C1.84228 3.30072 1.66669 3.72464 1.66669 4.16667V15C1.66669 15.9167 2.41669 16.6667 3.33335 16.6667Z"
						stroke="currentColor"
						stroke-opacity="0.6"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			)}
		</>
	);
};

export default FolderDisable;
