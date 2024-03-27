export type NarrowOverloadUnion<TUnion, TArg> = TUnion extends (
	arg: infer TFirstArg,
	...args: any[]
) => any
	? TFirstArg extends TArg
		? TUnion
		: never
	: never;
