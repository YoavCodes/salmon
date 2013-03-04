// routes
exports.router = function(res, req, pathname, segments, command) {
	
	high.util.log(segments)
	high.util.log(pathname)
	// decide what to do
	switch(pathname) {
		case "test":
			high.util.log('test page, see application/router.js')
			res.kill()
			break;

		default:
			res.kill()
			break;
	}
	return
}

