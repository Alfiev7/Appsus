export function Section({
  Icon,
  title,
  color,
  isActive,
  onToggle }) {
  const handleClick = () => {
    onToggle(title);
  };

  return (
    <div
      className={`section ${isActive ? 'active' : ''}`}
      style={{
        borderBottom: `3px solid ${color}`,
      }}
      onClick={handleClick}
    >
      <i className={Icon}></i>
      <h4>{title}</h4>
    </div>
  );
}