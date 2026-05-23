import { a as pb } from "./index-CvpHv2Ny.js";
//#region src/services/api.ts
var getClients = (filter) => pb.collection("clients").getFullList({
	expand: "created_by_id,preferred_barber_id",
	sort: "-created",
	filter
});
var createClient = (data) => pb.collection("clients").create(data);
var updateClient = (id, data) => pb.collection("clients").update(id, data);
var getBusinessHours = () => pb.collection("business_hours").getFullList({ sort: "day_of_week" });
var getClientPackages = (filter) => pb.collection("client_packages").getFullList({
	expand: "package_id,client_id,barber_id",
	sort: "-created",
	filter
});
var getBarbers = () => pb.collection("barbers").getFullList({
	sort: "-created",
	expand: "user_id"
});
var getCategories = () => pb.collection("categories").getFullList({ sort: "-created" });
var getAppointments = (filter) => pb.collection("appointments").getFullList({
	expand: "service_id.category_id,barber_id,client_id,client_package_id.package_id",
	sort: "-date",
	filter
});
var getAppointmentsByClient = (clientId) => pb.collection("appointments").getFullList({
	filter: `client_id='${clientId}'`,
	expand: "service_id,barber_id",
	sort: "-date"
});
var createAppointment = (data) => pb.collection("appointments").create(data);
var updateAppointment = (id, data) => pb.collection("appointments").update(id, data);
var getServices = () => pb.collection("services").getFullList({ sort: "-created" });
var getPackages = () => pb.collection("packages").getFullList({
	expand: "service_id",
	sort: "-created"
});
var getProducts = () => pb.collection("products").getFullList({ sort: "-created" });
var getProductPurchasesByClient = (clientId) => pb.collection("product_purchases").getFullList({
	filter: `client_id='${clientId}'`,
	expand: "product_id,barber_id",
	sort: "-date"
});
var getProductPurchases = (filter) => pb.collection("product_purchases").getFullList({
	expand: "product_id,client_id",
	sort: "-date",
	filter
});
var getClientLogs = (filter) => pb.collection("client_logs").getFullList({
	sort: "-created",
	filter
});
var getCommissions = (filter) => pb.collection("commissions").getFullList({
	expand: "barber_id",
	sort: "-created",
	filter
});
var getPaymentMethods = () => pb.collection("payment_methods").getFullList({ sort: "-created" });
//#endregion
export { getServices as _, getBarbers as a, getClientLogs as c, getCommissions as d, getPackages as f, getProducts as g, getProductPurchasesByClient as h, getAppointmentsByClient as i, getClientPackages as l, getProductPurchases as m, createClient as n, getBusinessHours as o, getPaymentMethods as p, getAppointments as r, getCategories as s, createAppointment as t, getClients as u, updateAppointment as v, updateClient as y };

//# sourceMappingURL=api-BO8gwyLR.js.map