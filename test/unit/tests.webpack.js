var testsContext = require.context('.', true, /\.spec$/)
testsContext.keys().forEach(testsContext)
