interface EmptyStateProps {
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({ title, message, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="elceo-empty">
      <h3 className="elceo-empty__title">{title}</h3>
      <p className="elceo-empty__message">{message}</p>
      {actionLabel && onAction && (
        <button className="elceo-empty__action" onClick={onAction} type="button">
          {actionLabel}
        </button>
      )}
    </div>
  );
}
