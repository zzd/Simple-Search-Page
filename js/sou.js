/*
作者:D.Young
主页：https://yyv.me/
github：https://github.com/5iux/sou
日期：2019-07-26
版权所有，请勿删除
*/
$(document).ready(function() {
	$("#menu").click(function(event) {
		$(this).toggleClass('on');
		$(".list").toggleClass('closed');
		$(".mywth").toggleClass('hidden');
	});
	$("#content").click(function(event) {
		$(".on").removeClass('on');
		$(".list").addClass('closed');
		$(".mywth").removeClass('hidden');
	});
});
