/*
 * @Author: sakurahuang
 * @Description: 
 * @Date: 2024-07-08 16:07:43
 */
import $ from 'jquery';

$('#change').click(function () {
	setTimeout($.proxy(function () {
		$(this).css('background-color', 'yellow')
	}, this), 1000)
})