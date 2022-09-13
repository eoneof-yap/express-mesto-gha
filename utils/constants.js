// Server status codes
const CREATED = 201;
const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const FORBIDDEN = 403;
const NOT_FOUND = 404;
const CONFLICT = 409;
const SERVER_ERROR = 500;

// User defaults
const DEFAULT_NAME = 'Жак-Ив Кусто';
const DEFAULT_ABOUT = 'Исследователь';
const DEFAULT_AVATAR = 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png';

// Error messages
const DB_CONNECTED_TEXT = 'База данных подключена';
const SERVER_START_FAILED_TEXT = 'Сервер не запустился';
const DB_NOT_CONNECTED_TEXT = 'Не удалось подключиться к базе данных';
const SERVER_STARTED_TEXT = 'Сервер запущен на порту';
const SERVER_ERROR_TEXT = 'Сервер не смог обработать запрос';
const AUTH_REQUIRED_TEXT = 'Необходима авторизация';
const PATH_NOT_FOUND_TEXT = 'Путь не найден';
const REQUEST_ERROR_TEXT = 'Ошибка в запросе';
const CARD_NOT_FOUND_TEXT = 'Карточка не найдена';
const CARD_RESTRICTED_TEXT = 'Нельзя удалять чужие карточки';
const CARD_DELETED_TEXT = 'Карточка удалена';
const WRONG_ID_TEXT = 'Неверный идентификатор';
const EMAIL_EXIST_TEXT = 'Пользователь с таким email уже существует';
const USER_NOT_FOUND_TEXT = 'Пользователь не найден';
const WRONG_GREDENTIALS_TEXT = 'Неправильные почта или пароль';

// Misc
const TOKEN_PREFIX = 'Bearer ';
const SALT_ROUNDS = 10;
const JWT_EXPIRATION_TIMEOUT = '7d';
const DB_DUPLICATE_KEY_CODE = 11000;

module.exports = {
  CREATED,
  BAD_REQUEST,
  FORBIDDEN,
  NOT_FOUND,
  SERVER_ERROR,
  CONFLICT,
  UNAUTHORIZED,

  DEFAULT_NAME,
  DEFAULT_ABOUT,
  DEFAULT_AVATAR,

  DB_CONNECTED_TEXT,
  SERVER_START_FAILED_TEXT,
  DB_NOT_CONNECTED_TEXT,
  SERVER_STARTED_TEXT,
  SERVER_ERROR_TEXT,
  AUTH_REQUIRED_TEXT,
  PATH_NOT_FOUND_TEXT,
  REQUEST_ERROR_TEXT,
  CARD_NOT_FOUND_TEXT,
  CARD_RESTRICTED_TEXT,
  CARD_DELETED_TEXT,
  WRONG_ID_TEXT,
  EMAIL_EXIST_TEXT,
  USER_NOT_FOUND_TEXT,
  WRONG_GREDENTIALS_TEXT,

  TOKEN_PREFIX,
  SALT_ROUNDS,
  JWT_EXPIRATION_TIMEOUT,
  DB_DUPLICATE_KEY_CODE,
};
