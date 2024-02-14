export type TTask = {
    data: { _id: string; title: string; status: string; priority: string; };
    _id: string;
    title: string;
    status: 'completed' | 'incomplete';
    priority: 'low' | 'medium' | 'high';
}

export type TRouteError {
    status: number;
    error?: Error;
}
    