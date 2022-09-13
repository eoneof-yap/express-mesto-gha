const { celebrate, Joi } = require('celebrate');

// eslint-disable-next-line no-useless-escape
const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/i;
const idConfig = Joi.string().alphanum().length(24);
const userNameConfig = Joi.string().min(2).max(30);
const userAboutConfig = Joi.string().min(2).max(30);
const avatarConfig = Joi.string().regex(urlRegex);
const emailConfig = Joi.string().required().email();
const passwordConfig = Joi.string().required().min(8);
const cardNameConfig = Joi.string().required().min(2).max(30);
const linkConfig = Joi.string().required().regex(urlRegex);

const validateId = celebrate({
  params: Joi.object().keys({
    id: idConfig,
  }),
});

const validateUserCredentials = celebrate({
  body: Joi.object().keys({
    name: userNameConfig,
    about: userAboutConfig,
    avatar: avatarConfig,
    email: emailConfig,
    password: passwordConfig,
  }),
});

const validateUserInfo = celebrate({
  body: Joi.object().keys({
    name: userNameConfig,
    about: userAboutConfig,
  }),
});

const validateUserAvatar = celebrate({
  body: Joi.object().keys({
    avatar: avatarConfig,
  }),
});

const validateCardData = celebrate({
  body: Joi.object().keys({
    name: cardNameConfig,
    link: linkConfig,
  }),
});

module.exports = {
  validateId,
  validateUserCredentials,
  validateUserInfo,
  validateUserAvatar,
  validateCardData,
};
