export const Logo = ({ height = 8, width = 8 }: { height?: number, width?: number }) => {
    return (
        <div className={`relative w-${width} h-${height}`}>
            <div className={`absolute w-${width} h-${height} top-0 left-0 transform -translate-x-1/2 -translate-y-1/2`}>
                <div className={`w-${width && width / 2} h-${height && height / 2}`}>
                    <div className="relative transition-transform duration-1600 transform-style-preserver-3d">
                        <div className={`w-${width} h-${height} transform-style-preserve-3d animate-spin infinite animate-cubic-bezier`}>
                            <div className={`w-${width && width / 2} h-${height && height / 2} bg-sky-11 bg-opacity-45`}></div>
                            <div className={`w-${width && width / 2} h-${height && height / 2} bg-sky-11 bg-opacity-50`}></div>
                            <div className={`w-${width && width / 2} h-${height && height / 2} bg-sky-11 bg-opacity-35`}></div>
                            <div className={`w-${width && width / 2} h-${height && height / 2} bg-sky-11 bg-opacity-55`}></div>
                            <div className={`w-${width && width / 2} h-${height && height / 2} bg-sky-11 bg-opacity-35`}></div>
                            <div className={`w-${width && width / 2} h-${height && height / 2} bg-sky-11 bg-opacity-45`}></div>

                            <div className={`relative w-${width} h-${height} transform translate-x-50 translate-y-50 animate-spin-inner infinite animate-cubic-bezier`}>
                                <div className={`w-${width && width / 2} h-${height && height / 2} border-10 border-purple-500`}></div>
                                <div className={`w-${width && width / 2} h-${height && height / 2} border-10 border-orange-500`}></div>
                                <div className={`w-${width && width / 2} h-${height && height / 2} border-10 border-red-500`}></div>
                                <div className={`w-${width && width / 2} h-${height && height / 2} border-10 border-green-500`}></div>
                                <div className={`w-${width && width / 2} h-${height && height / 2} border-10 border-blue-500`}></div>
                                <div className={`w-${width && width / 2} h-${height && height / 2} border-10 border-indigo-500`}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Logo;