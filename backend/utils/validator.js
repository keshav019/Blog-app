const AppError = require("../utils/error");
exports.validateEmail = (email, next) => {
    const emailRegex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!emailRegex.test(String(email).toLowerCase())) {
        console.log(email);
        return next(new AppError("Email is invalid", 403));
    }
}

exports.validatePassword = (password,next) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=\S+$).*$/;
    if (password.length < 6 || password.length > 12) {
        return next(new AppError("Password length should be of Length 6-12", 403));
    }
    const errorMessage = "Password must start with a letter, contain at least one capital letter, one special character, and one digit";
    if (!passwordRegex.test(password)) {
        return next(new AppError(errorMessage, 403));
    }
}

exports.isTokenExpired=(updateTimeStamp) =>{
    const currentTime = new Date();
    const updateTimeStampDate = new Date(updateTimeStamp);
    const timeDifferenceMs = currentTime - updateTimeStampDate;
    const minutesDifference = timeDifferenceMs / (1000 * 60);
    return minutesDifference >= 10;
}