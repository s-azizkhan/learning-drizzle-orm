import { Server } from './server';
import { NextFunction, Request, Response } from "express";

export enum METHOD {
    GET = 'get',
    POST = 'post',
    DELETE = 'delete',
    PUT = 'put',
    PATCH = 'patch',
}

interface RouteConfigProps {
    method: METHOD;
    path: string;
    module?: string | null;
}

const server = new Server();

class EventRoutes {

    @routeLog()
    @routeConfig({
        method: METHOD.GET,
        module: "/posts",
        path: "/",
    })
    public getPosts(
        request: Request,
        response: Response
    ) {
        return "Hello World!";
    }

    @routeConfig({
        method: METHOD.POST,
        module: "/posts",
        path: "/",
    })
    public async postAdd(req: Request, res: Response, next: NextFunction) {
        let timeoutId;
        try {
            const result = await new Promise((resolve) => {
                timeoutId = setTimeout(() => {
                    resolve("After 2 seconds");
                }, 2000)
            });
            return result;
        } catch (error) {
            next(error);
        }
    }
}

function routeConfig({ method, path, module }: RouteConfigProps): MethodDecorator {
    return function (
        target: Object,
        propertyKey: string | symbol,
        descriptor: PropertyDescriptor
    ) {
        const response = async (req: Request, res: Response, next: NextFunction) => {
            try {
                const original = await descriptor.value(req, res, next);

                res.status(200).json(original);
            } catch (error) {
                next(error);
            }
        }

        server.app[method](`/api/v1${module}${path}`, response);
    }
}
function routeLog(): MethodDecorator {
    return function (
        target: Object,
        propertyKey: string | symbol,
        descriptor: PropertyDescriptor
    ) {
        const original = descriptor.value;

        descriptor.value = function (...args: any[]) {
            let request = args[0] as Request;

            const {
                url,
                method,
                body,
                headers,
            } = request;

            console.log("[LOG]", {
                url,
                method,
                body,
                headers,
            });
            return original.apply(this, args);
        }
    };
}

server.start();