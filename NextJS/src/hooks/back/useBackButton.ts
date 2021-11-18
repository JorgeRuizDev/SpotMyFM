import { useCallback, useEffect, useState } from "react";

/**
 * Small event listener that prevents the usage of the back button while the state isLocked is true.
 *
 * @param {() => void} onBackAction
 * @param {boolean} isLocked
 */
function useBackButton(onBackAction: () => void, isLocked: boolean) {
  const [numberLocks, setNumberLocks] = useState(0);

  const freeBackButton = useCallback(() => {
    if (numberLocks != 0) {
      setNumberLocks(0);
      window.onpopstate = () => {};
      window.history.back();
    }
  }, [numberLocks]);

  const lockButton = useCallback(() => {
    if (window.history !== undefined) {
      setNumberLocks(1);
      window.history.pushState("forward", "", "");

      // On back Button:
      window.onpopstate = () => {
        window.history.pushState("forward", "", "");
        onBackAction();
      };
    }
  }, [onBackAction]);

  useEffect(() => {
    if (isLocked) {
      lockButton();
    } else {
      freeBackButton();
    }
  }, [isLocked, lockButton, freeBackButton]);
}

export default useBackButton;
