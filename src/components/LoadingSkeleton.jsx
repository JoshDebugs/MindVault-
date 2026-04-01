import './LoadingSkeleton.css';

export default function LoadingSkeleton({ count = 8 }) {
  return (
    <div className="skeleton-grid">
      {Array.from({ length: count }).map((_, i) => (
        <div className="skeleton-card" key={i} style={{ animationDelay: `${i * 0.08}s` }}>
          <div className="skeleton-card__cover skeleton-shimmer" />
          <div className="skeleton-card__info">
            <div className="skeleton-card__title skeleton-shimmer" />
            <div className="skeleton-card__author skeleton-shimmer" />
            <div className="skeleton-card__tag skeleton-shimmer" />
          </div>
        </div>
      ))}
    </div>
  );
}
