interface Props {
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmInline({ onConfirm, onCancel }: Props) {
  return (
    <span className="confirm-inline">
      <span className="confirm-text">Are you sure?</span>
      <button className="btn danger small" onClick={onConfirm}>
        Yes
      </button>
      <button className="btn small" onClick={onCancel}>
        No
      </button>
    </span>
  );
}
