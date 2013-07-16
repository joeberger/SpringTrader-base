/**
 * Default Configuration Object
 * @author Joe Berger
 */
app.conf = {
    baseUrl: '/spring-nanotrader-web/',
    device : 'computer',                            // Device rendering the application (changes to "mobile" depending on the user agent)
    sessionCookieName : 'appTraderSession',        // Name of the Cookie that will store the session info in the browser
    urlRoot : '/spring-nanotrader-services/api/',   // Path to the API service
    tplRoot : './partials/',                       // Path to the Templates directory
    accountIdUrlKey : '{accountid}',                // Key in the api urls that's gonna be replaced with the actual accountid
    pageUrlKey : '{page}',                          // Key in the api urls that's gonna be replaced with the page number
    quoteUrlKey : '{quote}',                        // Key in the api urls that's gonna be replaced with the quote
    randomUrlKey : '{random}',                      // Key in the api urls that's gonna be replaced with a random number
    marketSummaryUpdateMillisecs : 15000,           // Interval of milliseconds in which the Market Summary section updates
    currency : '$',                                 // Current currency is dollars
    thousandsSep : ',',                             // separator char for currency thousands/millions
    pageSize : 5,                                   // Amount of items to be displayed on list views
    successCss : 'alert alert-block alert-success', // CSS Class to show success message (or Positive Balance)
    errorCss : 'alert alert-block alert-error',     // CSS Class to show error message (or Negative Balance)
    pageCountSize : 10,                             // Amount of pages to be displayed on the pagination
    lastSellOrderId : -1                            // Order id of last sold quote
};
/**
 * API urls
 * @author Joe Berger
 */
app.conf.urls = {
    logout : app.conf.urlRoot + 'logout',
    login : app.conf.urlRoot + 'login',
    account : app.conf.urlRoot + 'account/:accountId',
    accountProfile : app.conf.urlRoot + 'accountProfile',
    marketSummary : app.conf.urlRoot + 'marketSummary',
    holdingSummary : app.conf.urlRoot + 'account/' + app.conf.accountIdUrlKey + '/holdingSummary',
    portfolioSummary : app.conf.urlRoot + 'account/:accountId/portfolioSummary',
    holdings : app.conf.urlRoot + 'account/' + app.conf.accountIdUrlKey + '/holdings',
    sellHolding : app.conf.urlRoot + 'account/' + app.conf.accountIdUrlKey + '/order/asynch',
    orders : app.conf.urlRoot + 'account/:accountId/orders', 
    order : app.conf.urlRoot + 'account/' + app.conf.accountIdUrlKey + '/order/asynch',
    quote : app.conf.urlRoot + 'quote',
    quotes : app.conf.urlRoot + 'quotes',
    adminUserData : app.conf.urlRoot + 'admin/userdata',
    killTCServer : app.conf.urlRoot + 'chaos/kill',
    crashTCServer : app.conf.urlRoot + 'chaos/oom',
    killSqlFireServer: app.conf.urlRoot + '/chaos/killsql',
    perfTest : app.conf.urlRoot + 'admin/perftest'
};

app.conf.tpls = {
    holdings : app.conf.tplRoot + 'holdings.html',
    holdingRow : app.conf.tplRoot + 'holdingRow.html',
    holdingModal : app.conf.tplRoot + 'holdingModal.html',
    marketSummary : app.conf.tplRoot + 'marketSummary.html',
    portfolioSummary : app.conf.tplRoot + 'portfolioSummary.html',
    navbar : app.conf.tplRoot + 'navbar.html',
    accountSummary : app.conf.tplRoot + 'accountSummary.html',
    footer : app.conf.tplRoot + 'footer.html',
    login : app.conf.tplRoot + 'login.html',
    portfolio : app.conf.tplRoot + 'portfolio.html',
    paginator : app.conf.tplRoot + 'paginator.html',
    positions : app.conf.tplRoot + 'positions.html',
    userStatistics : app.conf.tplRoot + 'userStatistics.html',
    registration : app.conf.tplRoot + 'registration.html',
    profile : app.conf.tplRoot + 'profile.html',
    contact : app.conf.tplRoot + 'contact.html',
    orders : app.conf.tplRoot + 'orders.html',
    orderRow : app.conf.tplRoot + 'orderRow.html',
    quotes : app.conf.tplRoot + 'quotes.html',
    quoteRow : app.conf.tplRoot + 'quoteRow.html',
    quoteModal : app.conf.tplRoot + 'quoteModal.html',
    warning : app.conf.tplRoot + 'warning.html',
    help : app.conf.tplRoot + 'help.html',
    overview : app.conf.tplRoot + 'overview.html',
    admin : app.conf.tplRoot + 'admin.html',
    leftnavbar : app.conf.tplRoot + 'leftnavbar.html',
    vfabricServers : app.conf.tplRoot + 'vfabricServers.html',
    vfabricServerRow : app.conf.tplRoot + 'vfabricServerRow.html'
};

/**
 * Hash tags to use on the code for the different application routes 
 * @author Joe Berger
 */
app.conf.links = {
    logout  : '/logout',
    login  : 'login',
    dashboard : 'dashboard',
    portfolio : 'portfolio',
    trade : 'trade',
    tradeWithQuote : 'trade/:quote',
    registration : 'registration',
    profile : 'profile',
    contact : 'contact',
    help : 'help',
    overview : 'overview',
    admin : 'admin'
};
