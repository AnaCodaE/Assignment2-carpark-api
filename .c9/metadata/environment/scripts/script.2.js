{"changed":true,"filter":false,"title":"script.2.js","tooltip":"/scripts/script.2.js","value":"/*global $ google setMapOnAll*/\n// var map, map2, infoWindow;\n// var service; //Load map for PlacesService\n// var locationSearch = {\n//   query: 'Singapore',\n//   fields: ['name', 'geometry'],\n// }; //for holding the data to set the map\n// var markers = [];\n//       // console.log(markers);\n// //Initiate google map to be displayed\n// function initMap() {\n//   map = new google.maps.Map(document.getElementById('map'), {\n//     center: { lat: 1.3521, lng: 103.8198 },\n//     zoom: 13\n//   });\n//   map2 = new google.maps.Map(document.getElementById('map2'), {\n//     center: { lat: 1.3521, lng: 103.8198 },\n//     zoom: 18\n//   });\n//   infoWindow = new google.maps.InfoWindow;\n//   service = new google.maps.places.PlacesService(map);\n\n//   //Shows the current location of user else return error\n//   if (navigator.geolocation) {\n//     //get the location of the user current position\n//     navigator.geolocation.getCurrentPosition(function(position) { // get user position\n//       var pos = {\n//         lat: position.coords.latitude,\n//         lng: position.coords.longitude,\n//       };\n//       infoWindow.setPosition(pos); // set the window to the location of user\n//       markerPlacement(pos, map) //set the marker to the location of the user, pos contains the lat and lng\n//       // markerPlacement(pos, map2) //set the marker to the location of the user, pos contains the lat and lng\n//       // markers.push(pos);\n//       // console.log(markers);\n//       map.setCenter(pos); //Set the map to center to the position set in pos\n//       // map2.setCenter(pos);\n//     }, function() {\n//       handleLocationError(true, infoWindow, map.getCenter());\n//     });\n//   }\n//   else {\n//     // Browser doesn't support Geolocation\n//     handleLocationError(false, infoWindow, map.getCenter());\n//   }\n   \n// }\n\n// //function to place marker of coordinates given\n// function markerPlacement(myLatLng, map) { //myLatLng to set location, map to set map to place marker\n//   var marker = new google.maps.Marker({\n//     position: myLatLng,\n//     map: map,\n//     // title: 'Your location'\n//   })\n//   // console.log(myLatLng);\n//   // markers.push(marker);\n// }\nfunction createMarker(place) {\n  var marker = new google.maps.Marker({\n    position: place.geometry.location,\n    map: map,\n  });\n  google.maps.event.addListener(marker, 'click', function() {\n    infowindow.setContent(place.name);\n    infowindow.open(map, this);\n  });\n  console.log(place.name);\n}\n\n\n//function to set window center to user location\n\n\nvar dataSource = \"https://api.data.gov.sg/v1/transport/carpark-availability\";\nvar dataSource2 = \"carparkdata.json\";\nvar carparkData = []\n\n\n// FUNCTIONS\n// Axios function to get data from the api\nfunction getDataFromEndpoint(callback) {\n  axios.get(dataSource)\n    .then(function(response) {\n      let result = response.data.items[0].carpark_data;\n      // // console.log(result)\n      callback(result)\n    })\n}\n// Axios function to get data from the JSON file (local)\nfunction getDataFromFile(callback) {\n  axios.get(dataSource2)\n    .then(function(response) {\n      let result = response.data;\n      // console.log(result)\n      callback(result) \n    })\n}\n// Calculate distance using Heversine Formula (CREDIT to stackOverflow solution)\nfunction getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {\n  var R = 6371; // Radius of the earth in km\n  var dLat = deg2rad(lat2 - lat1); // deg2rad below\n  var dLon = deg2rad(lon2 - lon1);\n  var a =\n    Math.sin(dLat / 2) * Math.sin(dLat / 2) +\n    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *\n    Math.sin(dLon / 2) * Math.sin(dLon / 2);\n  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));\n  var d = R * c; // Distance in km\n  return d;\n}\n\n\n// alert (getDistanceFromLatLonInKm(1.3521, 103.8198, 1.3531,103.8198 ))\n// function deg2rad(deg) {\n//   return deg * (Math.PI / 180)\n// }\n\n// MERGING DATA FROM API AND JSON FILE\ngetDataFromFile(function(carparkAddInfo){\n  getDataFromEndpoint(function(data){\n    for (let item in data) {\n      carparkData[item] = {\n        \"carpark_number\": data[item].carpark_number,\n        \"lot_type\": data[item].carpark_info[0][\"lot_type\"],\n        \"lots_available\": data[item].carpark_info[0][\"lots_available\"],\n        \"total_lots\": data[item].carpark_info[0][\"total_lots\"]\n      };\n      for (let item2 in carparkAddInfo) {\n        if (carparkAddInfo[item2].car_park_no == data[item].carpark_number) {\n          Object.assign(carparkData[item], {\n            \"address\": carparkAddInfo[item2].address,\n            \"car_park_basement\": carparkAddInfo[item].car_park_basement,\n            \"car_park_decks\": carparkAddInfo[item].car_park_decks,\n            \"car_park_type\": carparkAddInfo[item].car_park_type,\n            \"free_parking\": carparkAddInfo[item].free_parking,\n            \"gantry_height\": carparkAddInfo[item].gantry_height,\n            \"night_parking\": carparkAddInfo[item].night_parking,\n            \"short_term_parking\": carparkAddInfo[item].short_term_parking,\n            \"type_of_parking_system\": carparkAddInfo[item].type_of_parking_system,\n            \"x_coord\": carparkAddInfo[item].x_coord,\n            \"y_coord\": carparkAddInfo[item].y_coord\n          })\n\n        }\n      } //Working Set : Do not change\n    }\n  })\n})\nconsole.log(carparkData)\n\n\n$(function() {\n  // Get the input location from user; Set to search within Singapore Only\n  $(\"#location-submit\").click(function() {\n    locationSearch.query = ($(\"#search\").val()) + \" Singapore\"; \n    searchAndPlace(locationSearch);\n  })\n})\n\n","undoManager":{"mark":1,"position":5,"stack":[[{"start":{"row":1,"column":0},"end":{"row":1,"column":3},"action":"insert","lines":["// "],"id":7},{"start":{"row":2,"column":0},"end":{"row":2,"column":3},"action":"insert","lines":["// "]},{"start":{"row":3,"column":0},"end":{"row":3,"column":3},"action":"insert","lines":["// "]},{"start":{"row":4,"column":0},"end":{"row":4,"column":3},"action":"insert","lines":["// "]},{"start":{"row":5,"column":0},"end":{"row":5,"column":3},"action":"insert","lines":["// "]},{"start":{"row":6,"column":0},"end":{"row":6,"column":3},"action":"insert","lines":["// "]},{"start":{"row":7,"column":0},"end":{"row":7,"column":3},"action":"insert","lines":["// "]},{"start":{"row":8,"column":0},"end":{"row":8,"column":3},"action":"insert","lines":["// "]},{"start":{"row":9,"column":0},"end":{"row":9,"column":3},"action":"insert","lines":["// "]},{"start":{"row":10,"column":0},"end":{"row":10,"column":3},"action":"insert","lines":["// "]},{"start":{"row":11,"column":0},"end":{"row":11,"column":3},"action":"insert","lines":["// "]},{"start":{"row":12,"column":0},"end":{"row":12,"column":3},"action":"insert","lines":["// "]},{"start":{"row":13,"column":0},"end":{"row":13,"column":3},"action":"insert","lines":["// "]},{"start":{"row":14,"column":0},"end":{"row":14,"column":3},"action":"insert","lines":["// "]},{"start":{"row":15,"column":0},"end":{"row":15,"column":3},"action":"insert","lines":["// "]},{"start":{"row":16,"column":0},"end":{"row":16,"column":3},"action":"insert","lines":["// "]},{"start":{"row":17,"column":0},"end":{"row":17,"column":3},"action":"insert","lines":["// "]},{"start":{"row":18,"column":0},"end":{"row":18,"column":3},"action":"insert","lines":["// "]},{"start":{"row":19,"column":0},"end":{"row":19,"column":3},"action":"insert","lines":["// "]},{"start":{"row":20,"column":0},"end":{"row":20,"column":3},"action":"insert","lines":["// "]},{"start":{"row":22,"column":0},"end":{"row":22,"column":3},"action":"insert","lines":["// "]},{"start":{"row":23,"column":0},"end":{"row":23,"column":3},"action":"insert","lines":["// "]},{"start":{"row":24,"column":0},"end":{"row":24,"column":3},"action":"insert","lines":["// "]},{"start":{"row":25,"column":0},"end":{"row":25,"column":3},"action":"insert","lines":["// "]},{"start":{"row":26,"column":0},"end":{"row":26,"column":3},"action":"insert","lines":["// "]},{"start":{"row":27,"column":0},"end":{"row":27,"column":3},"action":"insert","lines":["// "]},{"start":{"row":28,"column":0},"end":{"row":28,"column":3},"action":"insert","lines":["// "]},{"start":{"row":29,"column":0},"end":{"row":29,"column":3},"action":"insert","lines":["// "]},{"start":{"row":30,"column":0},"end":{"row":30,"column":3},"action":"insert","lines":["// "]},{"start":{"row":31,"column":0},"end":{"row":31,"column":3},"action":"insert","lines":["// "]},{"start":{"row":32,"column":0},"end":{"row":32,"column":3},"action":"insert","lines":["// "]},{"start":{"row":33,"column":0},"end":{"row":33,"column":3},"action":"insert","lines":["// "]},{"start":{"row":34,"column":0},"end":{"row":34,"column":3},"action":"insert","lines":["// "]},{"start":{"row":35,"column":0},"end":{"row":35,"column":3},"action":"insert","lines":["// "]},{"start":{"row":36,"column":0},"end":{"row":36,"column":3},"action":"insert","lines":["// "]},{"start":{"row":37,"column":0},"end":{"row":37,"column":3},"action":"insert","lines":["// "]},{"start":{"row":38,"column":0},"end":{"row":38,"column":3},"action":"insert","lines":["// "]},{"start":{"row":39,"column":0},"end":{"row":39,"column":3},"action":"insert","lines":["// "]},{"start":{"row":40,"column":0},"end":{"row":40,"column":3},"action":"insert","lines":["// "]},{"start":{"row":41,"column":0},"end":{"row":41,"column":3},"action":"insert","lines":["// "]},{"start":{"row":42,"column":0},"end":{"row":42,"column":3},"action":"insert","lines":["// "]},{"start":{"row":43,"column":0},"end":{"row":43,"column":3},"action":"insert","lines":["// "]},{"start":{"row":44,"column":0},"end":{"row":44,"column":3},"action":"insert","lines":["// "]},{"start":{"row":46,"column":0},"end":{"row":46,"column":3},"action":"insert","lines":["// "]}],[{"start":{"row":48,"column":0},"end":{"row":48,"column":3},"action":"insert","lines":["// "],"id":8},{"start":{"row":49,"column":0},"end":{"row":49,"column":3},"action":"insert","lines":["// "]},{"start":{"row":50,"column":0},"end":{"row":50,"column":3},"action":"insert","lines":["// "]},{"start":{"row":51,"column":0},"end":{"row":51,"column":3},"action":"insert","lines":["// "]},{"start":{"row":52,"column":0},"end":{"row":52,"column":3},"action":"insert","lines":["// "]},{"start":{"row":53,"column":0},"end":{"row":53,"column":3},"action":"insert","lines":["// "]},{"start":{"row":54,"column":0},"end":{"row":54,"column":3},"action":"insert","lines":["// "]},{"start":{"row":55,"column":0},"end":{"row":55,"column":3},"action":"insert","lines":["// "]},{"start":{"row":56,"column":0},"end":{"row":56,"column":3},"action":"insert","lines":["// "]},{"start":{"row":57,"column":0},"end":{"row":57,"column":3},"action":"insert","lines":["// "]}],[{"start":{"row":70,"column":0},"end":{"row":83,"column":1},"action":"remove","lines":["//Search for location and place a marker on the map and center to the location","function searchAndPlace(locationSearch){","    service.findPlaceFromQuery(locationSearch, function(results, status) {","      if (status === google.maps.places.PlacesServiceStatus.OK) {","        for (var i = 0; i < results.length; i++) {","          createMarker(results[i]);","          console.log(results[i]);","          // markerPlacement(results[i], map);","        }","        map.setCenter(results[0].geometry.location);","        console.log (results[0].geometry.location)","      }","    });","}"],"id":9}],[{"start":{"row":3,"column":0},"end":{"row":3,"column":3},"action":"remove","lines":["// "],"id":10},{"start":{"row":4,"column":0},"end":{"row":4,"column":3},"action":"remove","lines":["// "]},{"start":{"row":5,"column":0},"end":{"row":5,"column":3},"action":"remove","lines":["// "]},{"start":{"row":6,"column":0},"end":{"row":6,"column":3},"action":"remove","lines":["// "]}],[{"start":{"row":3,"column":0},"end":{"row":3,"column":3},"action":"insert","lines":["// "],"id":11},{"start":{"row":4,"column":0},"end":{"row":4,"column":3},"action":"insert","lines":["// "]},{"start":{"row":5,"column":0},"end":{"row":5,"column":3},"action":"insert","lines":["// "]},{"start":{"row":6,"column":0},"end":{"row":6,"column":3},"action":"insert","lines":["// "]}],[{"start":{"row":72,"column":0},"end":{"row":78,"column":1},"action":"remove","lines":["function handleLocationError(browserHasGeolocation, infoWindow, pos) {","  infoWindow.setPosition(pos);","  infoWindow.setContent(browserHasGeolocation ?","    'Error: The Geolocation service failed.' :","    'Error: Your browser doesn\\'t support geolocation.');","  infoWindow.open(map);","}"],"id":12}]]},"ace":{"folds":[{"start":{"row":81,"column":40},"end":{"row":88,"column":0},"placeholder":"..."},{"start":{"row":90,"column":36},"end":{"row":97,"column":0},"placeholder":"..."},{"start":{"row":99,"column":60},"end":{"row":110,"column":0},"placeholder":"..."},{"start":{"row":119,"column":41},"end":{"row":148,"column":0},"placeholder":"..."}],"scrolltop":1260,"scrollleft":0,"selection":{"start":{"row":72,"column":0},"end":{"row":72,"column":0},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":{"row":62,"state":"start","mode":"ace/mode/javascript"}},"timestamp":1563593501715}