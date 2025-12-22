function Confirm({ message, onYes, onNo }) {
    return (
        <div className="overlay">
        <div className="confirm-box">
            <p>{message}</p>

            <div className="actions">
            <button onClick={onYes}>Yes</button>
            <button onClick={onNo}>No</button>
            </div>
        </div>
        </div>
    );
    }export default Confirm