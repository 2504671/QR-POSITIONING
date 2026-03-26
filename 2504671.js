const reader =new Html5Qrcode("camera");
let scannerOn = false;

function toggleScanner() {
    scannerOn = !scannerOn;
    if (scannerOn) {
        startScanner();
        mapContainer.style.display = "none";
        btn.innerText = "CANCEL";
    } else {
        stopScanner();
        mapContainer.style.display = "block";
        btn.innerText = "SCAN";
    }
}

function startScanner() {
    reader.start(
        { facingMode: "environment" },
        {},
        function (text) {
            const place = JSON.parse(text);
            showMarkerAt(place.top, place.left);
            toggleScanner();
        }
    ).catch(function (err) {
        console.error(err);
    });
}
try {
    const data= JSON.parse(text);
    // Move marker
    if(data.top && data.left) {
        showMarkerAt(data.top, data.left);
    }
    // Display inventory info
    document.getElementById("name").innerText = "Name: " + data.name;
    document.getElementById("store").innerText = "Store: " + (data.inStock ?? data.in_store);
    document.getElementById("price").innerText = "price: " + data.price + " £";

    //stop scanner
    toggleScanner();
} catch (e) {
    console.error("Invalid QR code JSON", e);
}

function stopScanner() {
    reader.stop();
}

function showMarkerAt(top, left) {
    marker.style.top = top;
    marker.style.left = left;
}
