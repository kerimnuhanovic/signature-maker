interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
	children: React.ReactNode;
}

export function Button({ children, className, ...props }: ButtonProps) {
	return (
		<button type="button" {...props} className={`h-12 rounded-lg bg-primary text-white disabled:bg-secondary ${className}`}>
			{children}
		</button>
	);
}
