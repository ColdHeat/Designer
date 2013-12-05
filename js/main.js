// String Repetition. "A".repeat(5) == "AAAAA"
	String.prototype.repeat = function( num )
	{
	    return new Array( num + 1 ).join( this );
	}

// Handles adding the javascript include on check and removing it
	$('.include').change(function(){
		if(!$(this).is(':checked')){
			for (var i = 0; i < html.session.getLength(); i++) {
				var x = html.session.getLine(i).indexOf($(this).val());

				if(x != -1){
					html.session.getDocument().removeLines(i, i);
					return;
				}
			};
		}

		var x = '';
		var i = 0;

		for (; i < html.session.getLength(); i++) {
			x = html.session.getLine(i).indexOf('<head>');
			if(x != -1){
				break;
			}
		};

		count = (html.session.getLine(i).split(" ").length - 1)/2
		html.session.getDocument().insertLines(x, Array(("  ".repeat(count + 1))+$(this).val()));
	})

// Handles iFrame content on load and on resize
	$().ready(function() {
		var content = '<style>'+css.getValue()+'</style>' + html.getValue();
		var iframe = document.getElementById('render');
		iframe.contentWindow.document.open('text/html', 'replace');
		iframe.contentWindow.document.write(content);
		iframe.contentWindow.document.close();

	    $('#render').height($(window).height());
	});


	$(window).resize(function() {
	    $('#render').height($(window).height());
	});
