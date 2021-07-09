$(document).ready(function() {
  $('select').niceSelect();
});

$('.range-slider').jRange({
    from: 0,
    to: 20000,
    step: 500,
    scale: [0,5000,10000,15000,20000],
    format: '%s',
    width: 220,
    showLabels: true,
    isRange : true,
    snap: true
});
