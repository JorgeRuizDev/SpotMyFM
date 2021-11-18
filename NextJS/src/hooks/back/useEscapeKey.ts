import { useCallback, useEffect, useState } from "react";

function useEscapeKey(onEscapePressAction: () => void, isLocked: boolean) {
  const [numberLocks, setNumberLocks] = useState(0);

  const onEscapePress = useCallback(
    (e: any) => {
      if (e.key === "Escape") {
        onEscapePressAction();
      }
    },
    [onEscapePressAction]
  );

  const freeEscapeKey = useCallback(() => {
    if (numberLocks != 0) {
      setNumberLocks(0);
      document.removeEventListener("keyup", onEscapePress);
    }
  }, [numberLocks, onEscapePress]);

  const lockEscapeKey = useCallback(() => {
    document.addEventListener("keyup", onEscapePress);
    setNumberLocks(1);
  }, [onEscapePress]);

  useEffect(() => {
    if (isLocked) {
      lockEscapeKey();
    } else {
      freeEscapeKey();
    }
  }, [isLocked, lockEscapeKey, freeEscapeKey]);
}

export default useEscapeKey;
