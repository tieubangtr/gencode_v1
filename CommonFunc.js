function copyStringToClipboard(str) {
  // Create new element
  var el = document.createElement("textarea");
  // Set value (string to be copied)
  el.value = str;
  // Set non-editable to avoid focus and move outside of view
  el.setAttribute("readonly", "");
  el.style = { position: "absolute", left: "-9999px" };
  document.body.appendChild(el);
  // Select text inside element
  el.select();
  // Copy text to clipboard
  document.execCommand("copy");
  // Remove temporary element
  document.body.removeChild(el);
}

function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    function (txt) {
      var rs = txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      return rs;
    }
  );
}

function capitalizeAfterUnderscore(input) {
  return input.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('_');
}