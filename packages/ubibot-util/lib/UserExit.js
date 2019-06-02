class UserExit extends Error {
  constructor(message) {
    super(message);
    this.name = "User Exit";
  }
}

module.exports = UserExit;
