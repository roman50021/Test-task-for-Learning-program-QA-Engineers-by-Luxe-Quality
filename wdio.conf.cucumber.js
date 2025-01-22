export const config = {
    runner: 'local',
    specs: [
        './test/features/**/*.feature'
    ],
    exclude: [

    ],
    maxInstances: 10,
    capabilities: [{
        browserName: 'chrome'
    }],
    logLevel: 'info',
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    framework: 'cucumber',
    reporters: ['spec'],

    cucumberOpts: {
        require: ['./test/features/step_definitions/*.js'], // шлях до кроків
        timeout: 60000
    },

}
