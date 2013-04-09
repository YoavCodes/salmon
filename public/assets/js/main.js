$(document).ready(function(){
	
	// waves
	$fwf = $('#front_wave_front');
	$fwb = $('#front_wave_back');
	$mw = $('#middle_wave');
	$bw = $('#bw');

	fwf_width = parseInt($fwf.css('width'), 10);
	fwb_width = parseInt($fwb.css('width'), 10);
	mw_width = parseInt($mw.css('width'), 10);
	bw_width = parseInt($bw.css('width'), 10);

	// animate
	setInterval(onFrame, 400)	
	// http://google.com/testcache/?_CACHE_CONTROL_=1365544199427
	
})

var i = 0;
function onFrame(e){
	i++
	// animate water
	$fwf.css({'background-position-x': i%fwf_width+"px"})
	$fwb.css({'background-position-x': i/1.9%fwb_width+"px"})
	$mw.css({'background-position-x': -i%-mw_width+"px"})
	//$bw.css({'background-position-x': i/4%bw_width+"px"})		
}



function afterNavCallback() {
	$('#sidebar li, #top_nav a').removeClass('selected')
	$('#sidebar li.nav_'+fin._meta.last_nav()+', #top_nav a.nav_'+fin._meta.last_nav().substring(0,3)).addClass('selected')
	PR.prettyPrint()
}