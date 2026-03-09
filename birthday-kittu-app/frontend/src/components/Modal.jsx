export default function Modal({ title, text, onClose, children }) {
  return (
    <div className="modal-overlay" onClick={onClose} role="presentation">
      <div className="modal-card glass" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <h3>{title}</h3>
        {text ? <p>{text}</p> : null}
        {children}
        <button className="btn" type="button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
