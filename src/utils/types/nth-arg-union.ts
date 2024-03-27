export type FirstArgUnion<TUnion> = TUnion extends (
	arg0: infer TFirstArg,
	...args: any[]
) => any
	? TFirstArg
	: never;
