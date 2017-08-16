/**
 * Created by hansa on 8/15/2017.
 */
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

let emailLengthChecker = (email) => {
    if (!email) {
        return false;
    } else {
        if (email.length < 5 || email.length > 30) {
            return false;
        } else {
            return true;
        }
    }
};

let validEmailChecker = (email) => {
    if (!email) {
        return false;
    } else {
        const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        return regExp.test(email);
    }
};

const emailValidator = [
    {
        validator: emailLengthChecker,
        message: 'Email cannot be less than 5 characters or more than 30 characters in length.'
    },
    {
        validator: validEmailChecker,
        message: 'Must be a valid email'
    }
];

let usernameLengthChecker = (username) => {
    if (!username) {
        return false;
    } else {
        if (username.length < 3 || username.length > 15) {
            return false
        } else {
            return true
        }
    }
};

let validUsernameChecker = (username) => {
    if (!username) {
        return false;
    } else {
        const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
        return regExp.test(username);
    }
};

const usernameValidator = [
    {
        validator: usernameLengthChecker,
        message: 'Username cannot be shorter than 5 characters or greater than 15 characters.'
    },
    {
        validator: validUsernameChecker,
        message: 'Username can only have Uppercase-lowercase alphanumeric characters.'
    }
];

let passwordLengthChecker = (password) => {
  if (!password) {
      return false
  } else {
      if (password.length < 8 || password.length > 35) {
        return false;
      } else {
          return true;
      }
  }
};

let validPasswordChecker = (password) => {
  if (!password) {
      return false;
  }  else {
      const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
      return regExp.test(password);
  }
};

const passwordValidator = [
    {
        validator: passwordLengthChecker,
        message: 'Password cannot be less than 8 characters in length and cannot be more than 35 characters in length.'
    },
    {
        validator: validPasswordChecker,
        message: 'Cannot validate Password.'
    }
];

const userSchema = new Schema({
    email: { type: String, required: true, unique: true, lowercase: true, validate: emailValidator },
    username: { type: String, required: true, unique: true, lowercase: true, validate: usernameValidator },
    password: { type: String, required: true, validate: passwordValidator }

});

userSchema.pre('save', function(next) {
   if (!this.isModified('password')) {
        return next();
   }

   bcrypt.hash(this.password, null, null, (err, hash) => {
       if (err) return next(err);
       this.password = hash;
       next();
   })
});

userSchema.methods.comparePassword = (password) => {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('users', userSchema);