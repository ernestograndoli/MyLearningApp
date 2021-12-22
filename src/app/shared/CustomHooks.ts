import { useState, useEffect, useRef } from "react";

export const useFormInput = (initialValue: any) => {
    const [value, setValue] = useState(initialValue);

    const handleChange = (e: any) => {
        setValue(e.target.value);
    };
    return {
        value,
        onChange: handleChange,
    };
};

export const useWindowDimension = () => {
    const getWindowDimensions = () => {
        const { innerWidth: width, innerHeight: height } = window;
        return {
            width,
            height,
        };
    };

    const [windowDimensions, setWindowDimensions] = useState(
        getWindowDimensions()
    );

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowDimensions;
};

export const useInterval = (callback: Function, delay: number) => {
    const savedCallback = useRef<Function>();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            if (savedCallback.current) savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
};

export function useDeviceDetect() {
    const [isMobile, setMobile] = useState(false);

    useEffect(() => {
        const userAgent =
            typeof window.navigator === "undefined" ? "" : navigator.userAgent;
        const mobile = Boolean(
            userAgent.match(
                /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
            )
        );
        setMobile(mobile);
    }, []);

    return { isMobile };
}

interface IMakeCancelable<T> {
    promise: Promise<T>;
    cancel: () => void;
}

export const makeCancelable = <T extends unknown>(promise: Promise<T>) => {
    let isCanceled = false;

    const wrappedPromise = new Promise<T>((resolve, reject) => {
        promise
            .then((val) => (isCanceled ? reject({ isCanceled }) : resolve(val)))
            .catch((error) =>
                isCanceled ? reject({ isCanceled }) : reject(error)
            );
    });

    return {
        promise: wrappedPromise,
        cancel() {
            isCanceled = true;
        },
    };
};

export const useCancellablePromise = (cancelable = makeCancelable) => {
    const emptyPromise = Promise.resolve(true);

    // test if the input argument is a cancelable promise generator
    if (cancelable(emptyPromise).cancel === undefined) {
        throw new Error(
            "promise wrapper argument must provide a cancel() function"
        );
    }

    const promises = useRef<IMakeCancelable<any>[]>();

    useEffect(() => {
        promises.current = promises.current || [];
        return function cancel() {
            promises.current?.forEach((p) => p.cancel());
            promises.current = [];
        };
    }, []);

    const cancellablePromise = <T extends unknown>(p: Promise<T>) => {
        const cPromise = cancelable(p);
        promises.current?.push(cPromise);
        return cPromise.promise;
    };

    return { cancellablePromise };
};
