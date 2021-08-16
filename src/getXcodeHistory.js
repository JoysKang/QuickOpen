const { execFileSync } = require('child_process');


function getXcodeHistory() {
    const cmd = __dirname + '/readXcode'
    let stdout = execFileSync(cmd);
    stdout = JSON.parse(stdout.toString().replaceAll("'", '"'))
    // console.log(stdout)
    return stdout;
}


module.exports = {
    getXcodeHistory
};


// console.time('test')
// getXcodeHistory();
// console.timeEnd('test')

