export interface Response<D, M> {
	data: D;
	meta: M;
}

export interface DefaultMeta {
	message: string;
}
