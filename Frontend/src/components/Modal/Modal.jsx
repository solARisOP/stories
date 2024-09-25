import './index.css'

const Modal = ({ children }) => {

    return (
        <div className="modal-layout">
            <div className="modal-main-layout" ></div>
            {children}
        </div>
    );
};

export default Modal;