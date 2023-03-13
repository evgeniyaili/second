import "../components/styles.css";

const Payment = (props) => {
    const {showPayment} = props;
    return (
        <div className="payment_container" 
        style={{opacity: showPayment ? 1 : 0, 
        visibility: showPayment ? "visible" : "hidden",
        maxHeight: showPayment ? "100vh" : 0,
        display: showPayment ? "block" : "none"}}>

        </div>
    )
}

export default Payment