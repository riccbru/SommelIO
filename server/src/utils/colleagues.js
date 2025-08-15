export default function formatRelationship(uid, relationship) {
	const isRequester = relationship.requester_id === uid;
	const r = {};
	r.status = relationship.status;
	r.rid = relationship.rid;
	r.created_at = relationship.created_at;
	r.colleague = isRequester
		? relationship.users_colleagues_addressee_idTousers
		: relationship.users_colleagues_requester_idTousers;
	return r;
}
