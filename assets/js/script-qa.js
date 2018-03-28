(function() {
	window.qaBar = new SimpleBar(document.getElementById('qa-questions-list'), { autoHide: false });
	$(window).resize(function(){
		window.qaBar.recalculate();
	})
	$(".qa-main-question").click(function(e){
		e.preventDefault();
		if($(this).hasClass("active"))
			return;

		let index = $("#qa-questions-list .qa-main-question").index(this);
		console.log("Index", index);

		if(index === -1)
			return;

		$(".qa-main-question.active, .qa-main-answer-item.active").removeClass("active");
		$(`.qa-main-question:eq(${index}), .qa-main-answer-item:eq(${index})`).addClass("active");
	})
})();
