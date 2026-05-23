import { o as ClientResponseError } from "./index-DGnO80YW.js";
//#region src/lib/pocketbase/errors.ts
function extractFieldErrors(error) {
	if (!(error instanceof ClientResponseError)) return {};
	const data = error.response?.data;
	if (!data || typeof data !== "object") return {};
	const errors = {};
	for (const [field, detail] of Object.entries(data)) if (detail && typeof detail === "object" && "message" in detail && typeof detail.message === "string") errors[field] = detail.message;
	return errors;
}
function getErrorMessage(error) {
	if (!(error instanceof ClientResponseError)) return error instanceof Error ? error.message : "An unexpected error occurred.";
	const msgs = Object.values(extractFieldErrors(error));
	return msgs.length > 0 ? msgs.join(" ") : error.message || "An unexpected error occurred.";
}
//#endregion
export { getErrorMessage as n, extractFieldErrors as t };

//# sourceMappingURL=errors-Df7y1F38.js.map