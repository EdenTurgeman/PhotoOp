exports.createError = (text, error) => {
    return {
        text,
        innerError: error
    }
};