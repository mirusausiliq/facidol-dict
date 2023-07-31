// Wait for the document to be ready before attaching click event
$(document).ready(function() {
  // Get the audio element by its ID
  var audioElement = document.getElementById("audioPlayer");

  // Function to play the audio when the button is clicked
  $("#playAudio").click(function() {
    audioElement.play();
  });
});
