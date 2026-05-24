interface StatusItem {
  label: string;
  value: string;
  tone?: "neutral" | "positive" | "warning" | "danger";
}

interface SafeStatusListProps {
  items: StatusItem[];
}

export default function SafeStatusList({ items }: SafeStatusListProps) {
  return (
    <ul className="elceo-status-list">
      {items.map((item, i) => {
        const valueCls = item.tone && item.tone !== "neutral"
          ? ` elceo-status-list__value--${item.tone}`
          : "";
        return (
          <li key={i} className="elceo-status-list__item">
            <span className="elceo-status-list__label">{item.label}</span>
            <span className={`elceo-status-list__value${valueCls}`}>{item.value}</span>
          </li>
        );
      })}
    </ul>
  );
}
