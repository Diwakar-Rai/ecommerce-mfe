import { useEffect, useState } from "react";
import { loadRemoteModule } from "../federation";
import LoadingFallback from "../components/LoadingFallback";
import RemoteErrorFallback from "../components/RemoteErrorFallback";

function ProfileRemote() {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let active = true;

    async function start() {
      setLoaded(false);
      setError("");

      try {
        await loadRemoteModule("angular-profile", "./ProfileElement");

        if (active) setLoaded(true);
      } catch (err) {
        console.error("Profile federation loading failed:", err);

        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load Profile.",
          );
        }
      }
    }

    void start();

    return () => {
      active = false;
    };
  }, [retryCount]);

  if (error) {
    return (
      <RemoteErrorFallback
        name="Profile"
        message={error}
        onRetry={() => setRetryCount((count) => count + 1)}
      />
    );
  }

  if (!loaded) return <LoadingFallback name="Profile" />;

  return <angular-profile />;
}

export default ProfileRemote;