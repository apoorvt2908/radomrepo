"use client";
import Button from '@/components/Elements/Button';


export default function Error() {
  return (
    <div style={{ marginLeft: '140px' }}>
      <div className="error-content">
        <svg
          width="80"
          height="80"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12" y2="16"></line>
        </svg>
        <h2>Syncing...</h2>
        <p>Fine-tuning data. Hold on!</p>
        <Button
          color="primary"
          varient="solid"
          radius="sm"
          type="button"
          clickHandler={() => window.location.reload()}
          size="sm"
        >
          Do it fast
        </Button>
      </div>
    </div>
  );
}
