export const random = (len: number) => {
    const optionString = "q1389urjasksf2938eraksdjfh298yrhlkajhkdcxcnqkjh23skdq23sdfh9087y8y267236trahg72364r7";
    const length = optionString.length;

    let ans = "";
    for (let i = 0; i < len; i++) {
        ans += optionString[Math.floor(Math.random() * length)];
    }
    return ans;
}

// random(15);