type LoadingFallbackProps = {
  name: string;
};

function LoadingFallback({ name }: LoadingFallbackProps) {
  return (
    <section className="remote-status" role="status" aria-live="polite">
      <span className="loading-spinner" aria-hidden="true" />
      <h2>Loading {name}</h2>
      <p>Please wait while this feature loads.</p>
    </section>
  );
}

export default LoadingFallback;
