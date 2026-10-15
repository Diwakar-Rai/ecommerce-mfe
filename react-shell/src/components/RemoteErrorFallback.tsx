type RemoteErrorFallbackProps = {
  name: string;
  message: string;
  onRetry: () => void;
};

function RemoteErrorFallback({
  name,
  message,
  onRetry,
}: RemoteErrorFallbackProps) {
  return (
    <section className="remote-status remote-status-error" role="alert">
      <h2>{name} is temporarily unavailable</h2>
      <p>
        We couldn't load this feature. Other parts of the application may
        still be available.
      </p>

      <details>
        <summary>Technical details</summary>
        <p className="remote-error-message">{message}</p>
      </details>

      <button type="button" className="remote-retry-button" onClick={onRetry}>
        Try again
      </button>
    </section>
  );
}

export default RemoteErrorFallback;
