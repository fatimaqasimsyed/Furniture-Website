export default function ProductCardSkeleton() {
  return (
    <div className="product-card-skeleton">
      <div className="skeleton product-card-skeleton__img" />
      <div className="product-card-skeleton__body">
        <div className="skeleton product-card-skeleton__line" style={{ height: '12px', width: '40%' }} />
        <div className="skeleton product-card-skeleton__line" style={{ height: '18px', width: '80%' }} />
        <div className="skeleton product-card-skeleton__line" style={{ height: '12px', width: '55%' }} />
        <div className="skeleton product-card-skeleton__line" style={{ height: '20px', width: '35%', marginTop: '4px' }} />
      </div>
    </div>
  );
}

