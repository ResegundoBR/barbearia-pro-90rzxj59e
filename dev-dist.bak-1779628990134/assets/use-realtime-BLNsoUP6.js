import { a as __toESM, n as require_react } from "./jsx-runtime-CpkZU50A.js";
import { r as pb } from "./index-DNpRsLNe.js";
//#region src/hooks/use-realtime.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
/**
* Hook for real-time subscriptions to a PocketBase collection.
* ALWAYS use this hook instead of subscribing inline.
* Uses the per-listener UnsubscribeFunc so multiple components
* can safely subscribe to the same collection without conflicts.
*
* Generic over the record type: pass your collection's interface as
* `useRealtime<MyRecord>(...)` to get a typed subscription payload
* instead of `unknown`.
*/
function useRealtime(collectionName, callback, enabled = true) {
	const callbackRef = (0, import_react.useRef)(callback);
	callbackRef.current = callback;
	(0, import_react.useEffect)(() => {
		if (!enabled) return;
		let unsubscribeFn;
		let cancelled = false;
		pb.collection(collectionName).subscribe("*", (e) => {
			callbackRef.current(e);
		}).then((fn) => {
			if (cancelled) fn().catch(() => {});
			else unsubscribeFn = fn;
		}).catch(() => {});
		return () => {
			cancelled = true;
			if (unsubscribeFn) unsubscribeFn().catch(() => {});
		};
	}, [collectionName, enabled]);
}
//#endregion
export { useRealtime as t };

//# sourceMappingURL=use-realtime-BLNsoUP6.js.map