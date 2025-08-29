import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime.js";

const NotificationsBox = ({
  notificationInfo,
  notificationInfomessage,
  notificationInfodate,
}) => {
  dayjs.extend(relativeTime);
  let timeString = dayjs(notificationInfodate).fromNow();
  timeString = timeString
    .replace("minutes", "Mins")
    .replace("minute", "Min")
    .replace("hours", "Hrs")
    .replace("hour", "Hr")
    .replace("seconds", "Secs")
    .replace("second", "Sec")
    .replace(" ago", " ago");
  return (
    <div className="flex hover:bg-[#12162c] justify-between items-center p-2">
      <div className="flex gap-2 items-center w-[80%]">
        <div className="flex  justify-center items-center h-8 w-8">
          <img
            className="rounded-3xl cursor-pointer h-full w-full object-cover"
            src={notificationInfo}
            alt="Pfp"
          />
        </div>
        <h1 className="text-[#CFD9FC] w-[95%] capitalize font-thin text-sm">
          {notificationInfomessage}
        </h1>
      </div>
      <h1 className="text-[#828BA9]   font-thin text-xs">
        {timeString}
      </h1>
    </div>
  );
};

export default NotificationsBox;
