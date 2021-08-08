import JWT from "jsonwebtoken";
import Cookies from "js-cookie";
const token = Cookies.get("access_token");

const currentUser = () => {
  let user;
  if (token === undefined) {
    return false;
  }

  JWT.verify(token, "HELLO MY NAME IS YUSUFSAID", (err, decoded) => {
    if (err) {
      return false;
    }
    user = decoded;
  });
  return user;
};

export default currentUser;
