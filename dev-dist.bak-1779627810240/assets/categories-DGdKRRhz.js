import { r as pb } from "./index-DhBjxsn_.js";
//#region src/services/categories.ts
var getCategories = () => pb.collection("categories").getFullList({ sort: "-created" });
var createCategory = (data) => pb.collection("categories").create(data);
//#endregion
export { getCategories as n, createCategory as t };

//# sourceMappingURL=categories-DGdKRRhz.js.map