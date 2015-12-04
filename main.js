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

function conjugate(quat) {
	out = [0, 0, 0, 0];
	out[0] = quat[0];
	out[1] = -quat[1];
	out[2] = -quat[2];
	out[3] = -quat[3];
	return out;
}

function quatMult(q1, q2) {
	out = [0, 0, 0, 0];
	out[0] = q1[0]*q2[0] - q1[1]*q2[1] - q1[2]*q2[2] - q1[3]*q2[3];
	out[1] = q1[0]*q2[1] + q1[1]*q2[0] + q1[2]*q2[3] - q1[3]*q2[2];
	out[2] = q1[0]*q2[2] - q1[1]*q2[3] + q1[2]*q2[0] + q1[3]*q2[1];
	out[3] = q1[0]*q2[3] + q1[1]*q2[2] - q1[2]*q2[1] + q1[3]*q2[0];
	return out;
}

function quatRotate(p, q){
	return quatMult(quatMult(q, p), conjugate(q));
}

function getPointFromQuat(q) {
	return [q[1], q[2], q[3]];
}

function displayResult(point) {
	var result = 'Result: ';
	$('#result').html(result + point[0] + ', ' + point[1] + ', ' + point[2]);
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
		var result_q = quatRotate(point_q, rotation_q);
		var point = getPointFromQuat(result_q);
		displayResult(point);
	});
});
