const JWT = require("jsonwebtoken");
const sereate = "Deepakraj@434543";
function createTokenForUser(user) {
  const payload = {
    _id: user._id,
    email: user.email,
  };
  const token = JWT.sign(payload, sereate);
  return token;
}

function validateToken(token) {
  try {
    const payload = JWT.verify(token, sereate);
    return payload;
  } catch (err) {
    return err;
  }
}

module.exports={createTokenForUser,validateToken}
