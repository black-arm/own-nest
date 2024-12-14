import { Method } from "../decorators/constants";

export interface Route {
    path: string;
    method: Method;
    handler: string;
    header?: any;
    params?: any;
}

export type Routes = Route[];
export type RouteMap = Map<string, Routes>