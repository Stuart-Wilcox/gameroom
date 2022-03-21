(async () => {
    const sleep = async (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    };

    while (true) {
        await sleep(1000);
    }
})();