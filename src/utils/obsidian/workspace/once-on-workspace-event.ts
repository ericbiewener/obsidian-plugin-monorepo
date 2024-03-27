import * as o from "obsidian";
import { NarrowOverloadUnion } from "../../types/narrow-overload-union";
import { FirstArgUnion } from "../../types/nth-arg-union";
import { OverloadsToUnion } from "../../types/overloads-to-union";

type Overloads = OverloadsToUnion<o.Workspace["on"]>;
type EventNames = FirstArgUnion<Overloads>;
type Overload<N extends EventNames> = NarrowOverloadUnion<Overloads, N>;
type Callback<N extends EventNames> = Parameters<Overload<N>>[1];

export const onceOnWorkspaceEvent = <N extends EventNames>(
	app: o.App,
	name: N,
	cb: Callback<N>,
) => {
	const wrappedCb = (...args: any[]) => {
		app.workspace.off(name, wrappedCb);
		// @ts-ignore
		cb(...args);
	};
	return app.workspace.on(name as any, wrappedCb);
};

export const waitForEventToFireOnce = <N extends EventNames>(
	app: o.App,
	name: N,
) =>
	new Promise<Parameters<Callback<N>>[0]>((res) =>
		onceOnWorkspaceEvent(app, name, res as any),
	);
