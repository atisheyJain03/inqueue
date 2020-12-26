import moment from "moment-timezone";

export default function (time) {
  return moment(time).fromNow();
}
