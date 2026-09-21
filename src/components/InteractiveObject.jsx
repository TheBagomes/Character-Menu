function InteractiveObject({
  className = "",
  children,
  onHover,
}) {
  return (
    <div
      className={`interactive-object ${className}`}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      {children}
    </div>
  );
}

export default InteractiveObject;