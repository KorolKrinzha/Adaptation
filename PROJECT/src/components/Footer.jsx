const Footer = ({children}) => {
    return (
        <div
            style={{
                display: "flex",
                width: "100%",
                height: "80px",
                backgroundColor: "#000000",
                alignItems: "center",
                justifyContent: "center",
                alignSelf: "flex-end",
                color: "#ffffff",
                fontWeight: "bold",
            }}>
            {children}
        </div>
    );
}

export default Footer;