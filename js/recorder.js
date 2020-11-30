(function(){
    let constraintObj = {
        audio: {deviceId:'a721f88ceeaaffb397b0c943843cdfdc5f557910f915f7d334f4922ff25211ba'},
        video: {deviceId: "7a04b37385f557c505fc4462f9cb5eea7de2045a15810ba3b096e0e45329f826",
            width: {min:1024, ideal: 1920},
            height: {min:576, ideal: 1080}}
    };

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

    navigator.mediaDevices.getUserMedia(constraintObj)
    .then(function(mediaStreamObj){
        let video = document.getElementById('video');
        if ("srcObject" in video){
            video.srcObject = mediaStreamObj;
        } else {
            video.src = window.URL.createObjectURL(mediaStreamObj);
        }

        video.onloadedmetadata = function(e){
            video.play();
        }

        let bnStart = document.getElementById("bnStart");
        let bnStop = document.getElementById("bnStop");
        let vidSave = document.getElementById("video2");
        console.log("DEBUG: Creating media");
        let mediaRecorder = new MediaRecorder(mediaStreamObj);
        let chunks =[];

        bnStart.addEventListener('click',(ev)=>{
            mediaRecorder.start();
            console.log(mediaRecorder.state);
            bnStop.disabled = false;
            bnStart.disabled = true;
        })

        bnStop.addEventListener('click', (ev)=>{
            mediaRecorder.stop();
            console.log(mediaRecorder.state);
            bnStop.disabled = true;
            bnStart.disabled = false;
        })

        mediaRecorder.ondataavailable = function(ev){
            chunks.push(ev.data);
        }
        
        mediaRecorder.onstop= (ev)=>{
            let blob = new Blob(chunks, {'type':'video/mp4'});
            chunks = [];
            let videoURL = window.URL.createObjectURL(blob);
            vidSave.src = videoURL;
        }
    })
    .catch(function(err){
        console.log(err.name, err.message);
    })

    
})();



