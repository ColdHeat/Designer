// String Repetition. "A".repeat(5) == "AAAAA"
	String.prototype.repeat = function( num )
	{
	    return new Array( num + 1 ).join( this );
	}
// CodeMirror CloseTags plugin
	CodeMirror.commands.autocomplete = function(cm) {
	    CodeMirror.showHint(cm, CodeMirror.htmlHint);
	}


// CodeMirror initialization
	var css = CodeMirror.fromTextArea(document.getElementById('css'), {
		mode: 'css', 
		theme: 'monokai',
		lineNumbers: true
	});

	var html = CodeMirror.fromTextArea(document.getElementById("html"), {
		mode: 'text/html',
		autoCloseTags: true,
		extraKeys: {"Shift-Tab": "autocomplete"},
		theme: "monokai",
		lineNumbers: true
	});


// onChange Handler for CodeMirror. Updates iFrame
	css.on("change", function(cm, change) {
		// $('#render').contents().find('html').html('<style>'+css.getValue()+'</style>' + html.getValue()); 
		var content = '<style>'+css.getValue()+'</style>' + html.getValue();
		var iframe = document.getElementById('render');
		iframe.contentWindow.document.open('text/html', 'replace');
		iframe.contentWindow.document.write(content);
		iframe.contentWindow.document.close();
	});			

	html.on("change", function(cm, change) {
		// $('#render').contents().find('html').html('<style>'+css.getValue()+'</style>' + html.getValue()); 
		var content = '<style>'+css.getValue()+'</style>' + html.getValue();
		var iframe = document.getElementById('render');
		iframe.contentWindow.document.open('text/html', 'replace');
		iframe.contentWindow.document.write(content);
		iframe.contentWindow.document.close();
	});

// Handles adding the javascript include on check and removing it
	$('.include').change(function(){
		if(!$(this).is(':checked')){
			for (var i = 0; i < html.lineCount(); i++) {
				var x = html.getLine(i).indexOf($(this).val());

				if(x != -1){
					html.removeLine(i);
					return;
				}
			};
		}

		var x = '';
		var i = 0;

		for (; i < html.lineCount(); i++) {
			x = html.getLine(i).indexOf('<head>');
			if(x != -1){
				break;
			}
		};


		count = (html.getLine(i).split(" ").length - 1)/2
		html.replaceRange( "\n"+("  ".repeat(count + 1))+$(this).val(), {line: i, ch: x+6});
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
