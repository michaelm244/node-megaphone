if (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia)
 	alert("we have audio!");

var context = new window.webkitAudioContext();
navigator.webkitGetUserMedia({audio: true}, function(stream) {
  var microphone = context.createMediaStreamSource(stream);
  var filter = context.createBiquadFilter();
  microphone.connect(filter);
  filter.connect(context.destination);
}, function() {
	alert("failed to connect");
});