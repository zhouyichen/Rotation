# Helper functions
def conjugate(q):
	'''conjugate of q'''
	return [q[0]] + [-i for i in q[1:]]

def quat(point):
	'''make a 3D point r into a quarternion'''
	return [0] + point

def point(quat):
	'''make a quarternion q into a 3d point'''
	return quat[1: ]

def quatmult(q1, q2):
	# quaternion multiplication
	out = [0, 0, 0, 0] # output array to hold the result
	out[0] = q1[0]*q2[0] - q1[1]*q2[1] - q1[2]*q2[2] - q1[3]*q2[3]
	out[1] = q1[0]*q2[1] + q1[1]*q2[0] + q1[2]*q2[3] - q1[3]*q2[2]
	out[2] = q1[0]*q2[2] - q1[1]*q2[3] + q1[2]*q2[0] + q1[3]*q2[1]
	out[3] = q1[0]*q2[3] + q1[1]*q2[2] - q1[2]*q2[1] + q1[3]*q2[0]
	return out

def quat_rotate(p, q):
	'''rotate p by q'''
	return quatmult(quatmult(q, p), conjugate(q))

def quat2rot(q):
	q0, q1, q2, q3 = q
	q0sq = q0 * q0
	q1sq = q1 * q1
	q2sq = q2 * q2
	q3sq = q3 * q3
	q0q1 = q0 * q1
	q0q2 = q0 * q2
	q0q3 = q0 * q3
	q1q2 = q1 * q2
	q1q3 = q1 * q3
	q2q3 = q2 * q3
	return [
		[q0sq + q1sq - q2sq - q3sq, 2 * (q1q2 - q0q3), 2 * (q1q3 + q0q2)],
		[2 * (q1q2 + q0q3), q0sq + q2sq - q1sq - q3sq, 2 * (q2q3 - q0q1)],
		[2 * (q1q3 - q0q2), 2 * (q2q3 + q0q1), q0sq + q3sq - q1sq - q2sq]
		]
