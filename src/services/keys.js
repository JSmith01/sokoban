const hasTizen = !!window.tizen;

const subscribersKeyDowns = [];
const subscribersKeyUps = [];

const keyHandler = subs => e => {
    let stop = false;
    const event = {...e, abortPropagation: () => { stop = true; }};
    let key = e.keyCode;

    for (let h of subs) {
        if (stop) {
            break;
        }

        if (h.filter.length === 0 || h.filter.includes(key)) {
            h.fn(event);
        }
    }
};

const keyDownHandler = keyHandler(subscribersKeyDowns);

const keyUpHandler = keyHandler(subscribersKeyUps);

export function init() {
    document.addEventListener('keydown', keyDownHandler);
    document.addEventListener('keyup', keyUpHandler);
}

export function destroy() {
    document.removeEventListener('keydown', keyDownHandler);
    document.removeEventListener('keyup', keyUpHandler);
}

const subscribe = subs => (fn, filter = []) => {
    let h = { fn, filter };
    subs.push(h);

    return () => {
        let idx = subs.indexOf(h);
        if (idx >= 0) {
            subs.splice(idx, 1);
        }
    }
};

export const subscribeKeyDown = subscribe(subscribersKeyDowns);

export const subscribeKeyUp = subscribe(subscribersKeyUps);

export const KEYS = (function () {
    let keyCodes = new Map([
        ['ArrowLeft', 37],
        ['ArrowUp', 38],
        ['ArrowRight', 39],
        ['ArrowDown', 40],
        ['Enter', 13],
        ['Back', 27],
        ['ChannelUp', 0x5b], // [
        ['ChannelDown', 0x5d], // ]
        ['MediaPlayPause', 32], // Space
        ['MediaRewind', 0x2d], // -
        ['MediaFastForward', 0x3d], // =
        ['MediaPlay', 0x70], // p
        ['MediaPause', 0x6f], // o
        ['MediaTrackPrevious', 0x2c], // comma - ,
        ['MediaTrackNext', 0x2e], // dot - .
        ['key0', 0x30],
        ['key1', 0x31],
        ['key2', 0x32],
        ['key3', 0x33],
        ['key4', 0x34],
        ['key5', 0x35],
        ['key6', 0x36],
        ['key7', 0x37],
        ['key8', 0x38],
        ['key9', 0x39],
        ['ColorF0Red', 0x68], // h
        ['ColorF1Green', 0x6a], // j
        ['ColorF2Yellow', 0x6b], // k
        ['ColorF3Blue', 0x6c] // l
    ]);

    if (hasTizen) {
        keyCodes.set('Back', 10009);
        for (let k of window.tizen.tvinputdevice.getSupportedKeys()) {
            if (keyCodes.has(k.name)) {
                window.tizen.tvinputdevice.registerKey(key);
                keyCodes.set(k.name, k.code);
            }
        }
    }

    return keyCodes.keys().reduce((a, k) => Object.assign(a, { [k]: keyCodes.get(k) }), {});
})();
