export const Logo = ({ height = 8, width = 8 }: { height?: number, width?: number }) => {
    return (
        <div className="logo">
            <div className="block">
                <div className="shape">
                    <div className="cube outer">
                        <div className="side left"></div>
                        <div className="side right"></div>
                        <div className="side top"></div>
                        <div className="side bottom"></div>
                        <div className="side front"></div>
                        <div className="side back"></div>

                        <div className="cube">
                            <div className="side left"></div>
                            <div className="side right"></div>
                            <div className="side top"></div>
                            <div className="side bottom"></div>
                            <div className="side front"></div>
                            <div className="side back"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Logo;