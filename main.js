function get_and_validate(id) {
	// for now just assume the input are floating numbers
	return parseFloat($(id).val());
}

$(function() {
	$('#calculate').mousedown(function () {
		var axis_x = get_and_validate('#axis-x');
		var axis_y = get_and_validate('#axis-y');
		var axis_z = get_and_validate('#axis-z');

		var angle = get_and_validate('#angle');

		var point_x = get_and_validate('#point-x');
		var point_y = get_and_validate('#point-y');
		var point_z = get_and_validate('#point-z');

		console.log(axis_x, point_x);

	});
});
