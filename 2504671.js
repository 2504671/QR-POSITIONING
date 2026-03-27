const reader =new Html5Qrcode("camera");
let scannerOn = false;

function toggleScanner() {
    scannerOn = !scannerOn;
    if (scannerOn) {
        startScanner();
        document.getElementById("mapContainer").style.display = "none";
        document.getElementById("camera").style.display = "block";
        document.getElementById("btn").innerText = "CANCEL";
    } else {
        stopScanner();
        document.getElementById("mapContainer").style.display = "block";
        document.getElementById("camera").style.display = "none";
        document.getElementById("btn").innerText = "SCAN";
    }
}

function startScanner() {
    reader.start(
        { facingMode: "environment" },
        {
            fps: 10,
            qrbox: {width: 300, height: 300}
        },
        function (text) {
            console.log("QR CODE:", text);
            
            try {
                const data= JSON.parse(text);
    
                // Display inventory info
                document.getElementById("name").innerText = "Name: " + data.name;
                document.getElementById("store").innerText = "Store: " + (data.inStock ?? data.in_store);
                document.getElementById("price").innerText = "price: " + data.price + " £";

                // Move marker
                if(data.top && data.left) {
                    showMarkerAt(data.top, data.left);
                }

                //stop scanner
                stopScanner();
                scannerOn = false;
                document.getElementById("btn").innerText = "SCAN";
    
                document.getElementById("camera").style.display = "none";
                document.getElementById("mapContainer").style.display = "block";

                } catch (e) {
                    console.error("Invalid QR JSON:", text);
                }
        }
    ).catch(err => console.error("Camera error:", err));
}
function stopScanner() {
    reader.stop().catch(err => console.log("Stop error:", err));
}

function showMarkerAt(top, left) {
    const marker = document.getElementById("marker");
    marker.style.top = top;
    marker.style.left = left;
}
