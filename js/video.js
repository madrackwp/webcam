(function(){
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia){
        console.log("getUserMedia() not supported");
        return;
    }

    //This is to go through and log all the available cameras the browser has access to
    navigator.mediaDevices.enumerateDevices() 
          .then(function(devices) {
            devices.forEach(function(device) {
              console.log(device.kind + ": " + device.label +
                          " id = " + device.deviceId);
            });
          })
          .catch(function(err) {
            console.log(err.name + ": " + err.message);
          });

    navigator.mediaDevices.getUserMedia({ audio: false, 
                                        video: {deviceId: "7a04b37385f557c505fc4462f9cb5eea7de2045a15810ba3b096e0e45329f826",
                                                width: {min:1024, ideal: 1920},
                                                height: {min:576, ideal: 1080}} //deviceId will default to the default camera on the device
                                        })
    .then(function(stream){
        var video = document.getElementById('video');
        if ("srcObject" in video){
            video.srcObject = stream;
        } else {
            video.src = window.URL.createObjectURL(stream);
        }
        video.onloadedmetadata = function(e){
            video.play();
        };
    }).catch(function(err){
        console.log(err.name + ": "+ err.message);
    });

    //This is to access the second camera so that it can be play on the video
    navigator.mediaDevices.getUserMedia({ audio: false, 
                                        video: {deviceId: "bceadf9ba7ee5cdf1c9d90980931bb7a961c00682011493748f8717cfa287b83",
                                                width:1920,
                                                height:1080} 
                                        })
    .then(function(stream){
        var video = document.getElementById('video2');
        if ("srcObject" in video){
            video.srcObject = stream;
        } else {
            video.src = window.URL.createObjectURL(stream);
        }
        video.onloadedmetadata = function(e){
            video.play();
        };
    }).catch(function(err){
        console.log(err.name + ": "+ err.message);
    });
})();
