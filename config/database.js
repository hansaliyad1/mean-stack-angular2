/**
 * Created by hansa on 8/14/2017.
 */

const crypto = require('crypto').randomBytes(256).toString('hex');


module.exports = {
    uri: 'mongodb://localhost:27017/mean-angular-2',
    secret: crypto,
    db: 'mean-angular-2'
}