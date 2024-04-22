import { Box } from "@radix-ui/themes"
import { CSSProperties } from "react";

export const Logo = ({ height = 36, width = 36 }: { height?: number, width?: number }) => {
	const primaryStyle = {
		fill: "none",
		stroke: "var(--gray-1)",
		strokeLinecap: "round" as CSSProperties['strokeLinecap'],
		strokeLinejoin: "round" as CSSProperties['strokeLinejoin'],
		strokeWidth: 2,
		transform: "scale(.9)"

	};

	const secondaryStyle = {
		fill: "none",
		stroke: "var(--gray-1)",
		strokeLinecap: "round" as CSSProperties['strokeLinecap'],
		strokeLinejoin: "round" as CSSProperties['strokeLinejoin'],
		strokeWidth: 2,
		transform: "scale(.8) translateX(2px) translateY(1px)"
	};

	return (
		<Box className="text-jade-11 scale-75 rounded-full bg-accent-11">
			<svg fill="currentColor" width={`${width}px`} height={`${height}px`} viewBox="0 0 24 24" id="up-trend" data-name="Line Color" xmlns="http://www.w3.org/2000/svg" className="icon line-color">
				<polyline id="primary" points="21 6 14 13 11 10 3 18" style={primaryStyle}></polyline>
				<polyline id="secondary" points="21 10 21 6 17 6" style={secondaryStyle}></polyline>
			</svg>
		</Box>
	)
}
export default Logo;