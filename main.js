function get_and_validate(id) {
	// for now just assume the input are floating numbers
	return parseFloat($(id).val());
}

function getMagnitude(axis_x, axis_y, axis_z) {
	return Math.sqrt(axis_x * axis_x + axis_y * axis_y + axis_z * axis_z);
}

function getRotationQuat(axis_x, axis_y, axis_z, angle) {
	angle = angle/2;
	var cos = Math.cos(angle);
	var sin = Math.sin(angle);
	var magnitude = getMagnitude(axis_x, axis_y, axis_z);
	return [
		cos, 
		sin * axis_x / magnitude, 
		sin * axis_y / magnitude, 
		sin * axis_z / magnitude 
		]
}

function getQuatFromPoint(point_x, point_y, point_z) {
	return [0, point_x, point_y, point_z];
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

		var rotation_q = getRotationQuat(axis_x, axis_y, axis_z, angle);
		var point_q = getQuatFromPoint(point_x, point_y, point_z);
		console.log(rotation_q, point_q);

	});
});
