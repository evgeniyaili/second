import "../components/styles.css";

const Payment = (props) => {
    const {showPayment, setShowPayment} = props;

    const handleShow = () => {
        setShowPayment((prev) => !prev)
    }
    return (
        <div className="payment_container" onClick={handleShow}
        style={{opacity: showPayment ? 1 : 0, 
        visibility: showPayment ? "visible" : "hidden",
        maxHeight: showPayment ? "100vh" : 0,
        display: showPayment ? "block" : "none"}}>
            Редактировать
        </div>
    )
}

export default Payment