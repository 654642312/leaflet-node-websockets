const map = L.map("map-template").setView([51.505, -0.09], 13);

const socket = io();

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

map.locate({ enableHightAccuray: true });
map.on("locationfound", (e) => {
	const coords = [e.latlng.lat, e.latlng.lng];
	const marker = L.marker(coords).bindPopup("You are here!");
	marker.addTo(map);

	socket.emit("userCoordinates", e.latlng);
});

socket.on("newUserCoordinates", (coords) => {
	console.log("new user is connected");
	const marker = L.marker([coords.lat, coords.lng]).bindPopup("Hello!");
	marker.addTo(map);
});
