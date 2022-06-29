const jwt = require("jsonwebtoken");
const createError = require("http-errors");
require("dotenv").config();

module.exports = {
  signAt: async (userId) => {
    if (!userId) throw createError.InternalServerError();
    return new Promise((resolve, reject) => {
      const payload = {};
      const secret = process.env.ATSECRET;
      const options = {
        issuer: "nodejs-krisnarusdiono",
        audience: userId,
        expiresIn: "1d",
      };
      jwt.sign(payload, secret, options, (err, encoded) => {
        if (err) return reject(createError.InternalServerError(err.message));
        return resolve(encoded);
      });
    });
  },
  signRt: async (userId) => {
    if (!userId) throw createError.InternalServerError();
    return new Promise((resolve, reject) => {
      const payload = {};
      const secret = process.env.RTSECRET;
      const options = {
        issuer: "nodejs-krisnarusdiono",
        audience: userId,
        expiresIn: "1d",
      };
      jwt.sign(payload, secret, options, (err, encoded) => {
        if (err) return reject(createError.InternalServerError(err.message));
        return resolve(encoded);
      });
    });
  },
  parseAt: async (at) => {
    return new Promise((resolve, reject) => {
      jwt.verify(at, process.env.ATSECRET, (err, payload) => {
        if (err) return reject(createError.InternalServerError());
        return resolve(payload.aud);
      });
    });
  },
  parseRt: async (rt) => {
    return new Promise((resolve, reject) => {
      jwt.verify(rt, process.env.RTSECRET, (err, payload) => {
        if (err) return reject(createError.InternalServerError());
        return resolve(payload.aud);
      });
    });
  },
};
