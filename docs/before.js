//init files, react lover suggestion
function RandomInt(max) {
    return Math.floor(Math.random() * max);
}

class Region {
    constructor(name, rgb) {
        this.name = name;
        this.rgb = rgb;
    }
}
function getLocalStgOr(key, default_value) {
    x = localStorage.getItem(key);
    //react lover suggestion
    return Number(x ?? default_value)
}

function saveXPAndLvl(xp, lvl) {
    localStorage.setItem("xp", xp);
    localStorage.setItem("lvl", lvl);
}

function fibonacci(n) {
    if (n < 0)
        throw RangeError("Negative arguments not implemented");
    return fib(n)[0];
}
function fib(n) {
    if (n == 0)
        return [0n, 1n];
    else {
        const [a, b] = fib(Math.floor(n / 2));
        const c = a * (b * 2n - a);
        const d = a * a + b * b;
        if (n % 2 == 0)
            return [c, d];
        else
            return [d, c + d];
    }
}


