var messages = [];
var map;

function make_message(msg, lat, lng)
{
	console.log('making message...', msg, lat, lng);
	return {
		message: msg,
		lat: lat,
		lng: lng,
		time: Date.now()
	}
}

function get_messages()
{
	let ref = firebase.database().ref('messages');
	ref.on('value', (s) => messages = s.val() || [], (e) => console.log(e));
}

function set_messages()
{
	let ref = firebase.database().ref('messages');
	ref.set(messages);
}

function add_message(msg)
{
	navigator.geolocation.getCurrentPosition(function () {}, function () {}, {});
	navigator.geolocation.getCurrentPosition((p) => console.log(p), (e) => console.log(e), {timeout:3000});
}

function setup_map()
{
	map = L.map('map', { zoomControl:false }).setView([37.533333, -77.466667], 13);
	L.tileLayer('http://a.tile.stamen.com/toner/{z}/{x}/{y}.png').addTo(map);
}

function add_markers()
{
	for (let msg of messages)
	{
		let marker = L.marker({lat:msg.lat, lng:msg.lng}, {
			riseOnHover: true
		}).bindPopup(msg.message, {
			closeButton: false,
			closeOnClick: true,
			maxWidth: 600
		}).addTo(map);
	}
}

get_messages();